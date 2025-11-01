"use client";

import fs from "node:fs"; // node: protocol
// lazy import redis inside getRedisClient to keep optional dependency
let redisClient = null;
const memCache = new Map(); // simple in-memory cache
const DEFAULT_TTL = 60 * 5; // 5 minutes
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { searchBarAction } = require("../action/searchBarAction.js");

export async function getRedisClient() {
	if (redisClient) return redisClient;
	const redisUrl = process.env.REDIS_URL;
	if (!redisUrl) return null;
	try {
		// lazy dynamic import to avoid hard dependency failures
		const redisMod = await import("redis");
		const { createClient } = redisMod;
		redisClient = createClient({ url: redisUrl });
		await redisClient.connect();
		return redisClient;
	} catch (err) {
		console.warn(`Redis unavailable: ${err?.message}`);
		redisClient = null;
		return null;
	}
}

export function trigramSimilarity(a = "", b = "") {
	// don't reassign parameters — use local vars
	const sa = String(a).toLowerCase();
	const sb = String(b).toLowerCase();
	if (!sa.length || !sb.length) return 0;

	const bigrams = (s) => {
		const set = new Set();
		for (let i = 0; i < s.length - 1; i++) {
			set.add(s.slice(i, i + 2));
		}
		return set;
	};

	const ta = bigrams(sa);
	const tb = bigrams(sb);

	let inter = 0;
	// prefer for...of
	for (const t of ta) {
		if (tb.has(t)) inter++;
	}

	const denom = Math.max(ta.size, tb.size);
	return denom === 0 ? 0 : inter / denom;
}

export async function writeAnalytics(event) {
	try {
		const client = await getRedisClient();
		if (client) {
			// optional chaining is safe here
			await client.rPush?.("search_analytics", JSON.stringify(event));
			return;
		}
		// fallback: write to a file or the in-memory cache
		const now = Date.now();
		memCache.set(now, event);
		// append to a local file as fallback (non-blocking)
		fs.appendFile(
			"./search_analytics.log",
			`${new Date().toISOString()} ${JSON.stringify(event)}\n`,
			(err) => {
				if (err)
					console.warn(`Failed to write analytics fallback: ${err?.message}`);
			},
		);
	} catch (err) {
		console.warn(`Failed to write analytics: ${err?.message}`);
	}
}

/**
 * Controller: req.query: q, limit, fuzzy (optional: 'false' to disable)
 * Returns JSON array of hits.
 */
export async function searchBarController(req, res) {
	console.log(
		`[search] hit q=${req.query?.q} limit=${req.query?.limit} ip=${req.ip} ua=${req.headers?.["user-agent"]}`,
	);
	try {
		const q = req.query?.q ? String(req.query.q).trim() : "";
		const rawLimit = req.query?.limit ? Number(req.query.limit) : 5;
		const limit = Math.max(
			1,
			Math.min(20, Number.isFinite(rawLimit) ? rawLimit : 5),
		);
		const fuzzy = !(req.query?.fuzzy === "false");

		if (!q) return res.json([]);

		const cacheKey = `search:v1:${encodeURIComponent(q.toLowerCase())}:L${limit}:F${fuzzy ? 1 : 0}`;
		const cached = await getCached(cacheKey);
		if (cached) {
			writeAnalytics({
				q,
				cached: true,
				hits: cached?.length ?? 0,
				timestamp: new Date().toISOString(),
				source: "cache",
				fuzzy,
			}).catch(() => {});
			return res.json(cached);
		}

		const start = Date.now();
		// fetch candidates (action may already limit/rank)
		const fetchLimit = fuzzy ? Math.max(limit * 4, 20) : limit;
		const rows = await searchBarAction(q, fetchLimit);

		let results = Array.isArray(rows) ? rows.slice() : [];

		if (fuzzy) {
			const qLower = q.toLowerCase();
			results = results
				.map((r) => {
					const title = (r.title || "").toString();
					let score = 0;
					const tl = title.toLowerCase();
					if (!title) score = 0;
					else if (tl === qLower) score = 2.0;
					else if (tl.startsWith(qLower)) score = 1.0;
					else if (tl.includes(qLower)) score = 0.8;
					else score = trigramSimilarity(tl, qLower);
					if (r.type === "user") score *= 1.05;
					return { ...r, _score: score };
				})
				.sort((a, b) => (b._score || 0) - (a._score || 0));
			// keep non-zero scores or top results
			const filtered = results.filter((r) => (r._score || 0) > 0);
			results = filtered.length ? filtered : results;
		}

		const finalResults = (results || [])
			.slice(0, limit)
			.map(({ _score, ...rest }) => rest);

		await setCached(cacheKey, finalResults, 60 * 5); // TTL = 5min

		const duration = Date.now() - start;
		writeAnalytics({
			q,
			cached: false,
			hits: finalResults.length,
			durationMs: duration,
			timestamp: new Date().toISOString(),
			ua: req.headers?.["user-agent"],
			ip:
				req.ip || req.headers?.["x-forwarded-for"] || req.socket?.remoteAddress,
			source: "searchBarController",
			fuzzy,
		}).catch(() => {});

		return res.json(finalResults);
	} catch (err) {
		console.error(
			"searchBarController error:",
			err?.stack ?? err?.message ?? String(err),
		);
		writeAnalytics({
			error: err?.message ?? String(err),
			timestamp: new Date().toISOString(),
			source: "searchBarController_error",
		}).catch(() => {});
		if (res && typeof res.status === "function") {
			return res.status(500).json([]);
		}
		return null;
	}
}

async function getCached(key) {
	// try redis first
	try {
		const client = await getRedisClient();
		if (client) {
			const raw = await client.get(key);
			if (raw) return JSON.parse(raw);
		}
	} catch (err) {
		// ignore redis error, fallback to memCache
		console.warn(`Redis GET failed: ${err?.message}`);
	}
	// fallback memory
	if (memCache.has(key)) return memCache.get(key);
	return null;
}

async function setCached(key, value, ttl = DEFAULT_TTL) {
	const payload = JSON.stringify(value);
	try {
		const client = await getRedisClient();
		if (client) {
			await client.setEx?.(key, ttl, payload);
		}
	} catch (err) {
		console.warn(`Redis SET failed: ${err?.message}`);
	}
	// always set in-memory fallback
	try {
		memCache.set(key, value);
		// schedule in-memory eviction
		setTimeout(() => memCache.delete(key), ttl * 1000);
	} catch (err) {
		/* ignore */
	}
}
