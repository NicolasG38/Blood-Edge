/* biome-disable lint/a11y/useSemanticElements */
/* biome-disable lint/a11y/useValidAriaRole */
/* biome-disable lint/a11y/noNoninteractiveElementToInteractiveRole */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import "./SearchBar.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Hit = {
	id: number | string;
	title: string;
	href?: string;
	icon?: string;
};

const BaseUrl = process.env.NEXT_PUBLIC_API_URL ?? ""; // ex: "http://localhost:3310"
const MAX_RESULTS = 10; // moved out of the component

export default function SearchBar() {
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [hits, setHits] = useState<Hit[]>([]);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [activeIndex, setActiveIndex] = useState<number>(-1);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	// nouvelle fonction réutilisable pour lancer la recherche
	const performSearch = useCallback(
		async (qParam?: string) => {
			const q = (typeof qParam === "string" ? qParam : query).trim();
			if (!q) {
				setHits([]);
				setOpen(false);
				setLoading(false);
				return [];
			}
			setLoading(true);
			try {
				const url = `${BaseUrl}/api/search?q=${encodeURIComponent(
					q,
				)}&limit=${MAX_RESULTS}`;
				const res = await fetch(url, { method: "GET" });
				if (!res.ok) throw new Error("search error");
				const data = (await res.json()) as Hit[];
				const arr = Array.isArray(data) ? data : [];
				// déduplique par (id, href) puis tronque
				const seen = new Set<string>();
				const unique: Hit[] = [];
				for (const h of arr) {
					const k = `${String(h.id)}|${h.href ?? ""}`;
					if (!seen.has(k)) {
						seen.add(k);
						unique.push(h);
					}
				}
				setHits(unique.slice(0, MAX_RESULTS));
				setOpen(true);
				setActiveIndex(-1);
				return arr;
			} catch (err) {
				console.error(err); // use the caught error to silence the unused-warning
				setHits([]);
				setOpen(false);
				return [];
			} finally {
				setLoading(false);
			}
		},
		[query], // maxResults not needed anymore (it's a top-level constant)
	);

	useEffect(() => {
		if (!query) return;
		performSearch(query);
	}, [query, performSearch]);

	// close on outside click
	useEffect(() => {
		const onDocClick = (e: MouseEvent) => {
			if (!containerRef.current) return;
			if (!containerRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("click", onDocClick);
		return () => document.removeEventListener("click", onDocClick);
	}, []);

	const onSelect = (hit: Hit) => {
		setOpen(false);
		setQuery("");
		// navigate if href provided, otherwise do nothing
		if (hit.href) router.push(hit.href);
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!open) {
			if (e.key === "ArrowDown" && hits.length) {
				setOpen(true);
				setActiveIndex(0);
			}
			return;
		}
		if (e.key === "ArrowDown") {
			setActiveIndex((i) => Math.min(i + 1, hits.length - 1));
			e.preventDefault();
		} else if (e.key === "ArrowUp") {
			setActiveIndex((i) => Math.max(i - 1, 0));
			e.preventDefault();
		} else if (e.key === "Enter") {
			if (activeIndex >= 0 && hits[activeIndex]) {
				onSelect(hits[activeIndex]);
			} else if (hits.length) {
				onSelect(hits[0]);
			}
		} else if (e.key === "Escape") {
			setOpen(false);
		}
	};

	return (
		<div id="search-bar-main" ref={containerRef} className="search-bar-wrapper">
			<input
				ref={inputRef}
				type="text"
				role="combobox"
				placeholder="Looking for something..."
				spellCheck={false}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={onKeyDown}
				aria-haspopup="listbox"
				aria-autocomplete="list"
				aria-expanded={open}
				aria-controls="search-results-list"
				aria-activedescendant={
					activeIndex >= 0 ? `search-hit-${activeIndex}` : undefined
				}
			/>
			<button
				id="search-button"
				type="button"
				aria-label="Search"
				onClick={async () => {
					// si l'utilisateur a tapé une query, lance une recherche et navigue sur le 1er résultat
					if (query.trim()) {
						const results = await performSearch(query);
						if (results.length) onSelect(results[0]);
						return;
					}
					// sinon, comportement précédent : navigue vers le 1er hit s'il existe
					if (hits.length) onSelect(hits[0]);
				}}
			>
				Search
				<Image
					src="/assets/icons/travel_explore.svg"
					alt="Search"
					width={36}
					height={36}
				/>
			</button>

			{open && (
				<ul
					id="search-results-list"
					role="listbox"
					className="search-results"
					aria-label="Résultats de recherche"
					tabIndex={-1} // listbox non tabbable, focus reste sur l'input (aria-activedescendant)
				>
					{loading && (
						<li className="search-loading" role="none">
							Loading…
						</li>
					)}
					{!loading && hits.length === 0 && (
						<li className="search-empty" role="none">
							No results
						</li>
					)}
					{!loading &&
						hits.map((hit, idx) => (
							<li
								id={`search-hit-${idx}`}
								key={`${String(hit.id)}-${hit.href ?? idx}`}
								role="option"
								aria-selected={activeIndex === idx}
								className={`search-hit ${activeIndex === idx ? "active" : ""}`}
								tabIndex={-1}
								onMouseEnter={() => setActiveIndex(idx)}
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => onSelect(hit)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										onSelect(hit);
									}
								}}
							>
								{hit.icon ? (
									<Image src={hit.icon} alt="" width={28} height={28} />
								) : (
									<span className="search-hit-icon-placeholder" />
								)}
								<span className="search-hit-title">{hit.title}</span>
							</li>
						))}
				</ul>
			)}
		</div>
	);
}
