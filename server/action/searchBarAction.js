import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { search } = require("../repository/searchBarRepository.js");

/**
 * searchBarAction(q, limit) -> Promise<Array<{type,id,title,icon,href}>>
 */
export async function searchBarAction(q, limit = 5) {
	if (!q || typeof q !== "string") return [];
	const query = q.trim();
	if (!query) return [];

	const maxLimit = Math.min(20, Math.max(1, Number(limit) || 5));
	try {
		const rows = await search(query, maxLimit);
		const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

		const normalized = (rows || []).map((r) => {
			let icon = r.icon || null;
			if (icon && !/^(https?:)?\/\//i.test(icon) && !icon.startsWith("/")) {
				icon = baseURL + icon;
			}
			return {
				type: r.type || "objet",
				id: r.id,
				title: r.title || "",
				icon,
				href:
					r.href ||
					(r.type === "user"
						? `/dashboard/${encodeURIComponent(r.title)}`
						: `/arsenal/${r.id}`),
			};
		});

		// ranking simple : remontée des titres commençant par la query
		const ql = query.toLowerCase();
		normalized.sort((a, b) => {
			const ai = (a.title || "").toLowerCase().indexOf(ql);
			const bi = (b.title || "").toLowerCase().indexOf(ql);
			if (ai === -1 && bi === -1) return 0;
			if (ai === -1) return 1;
			if (bi === -1) return -1;
			return ai - bi;
		});

		return normalized.slice(0, maxLimit);
	} catch (err) {
		console.error("searchBarAction error:", err);
		return [];
	}
}
