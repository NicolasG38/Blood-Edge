import "../Filter.css";
import { useState, useEffect } from "react";

interface Exospine {
	id: number;
	Exospine_title_fr: string;
	Exospine_title_en: string;
}

export default function ExospineSearchBar() {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const [exospines, setExospines] = useState<Exospine[]>([]);
	const [hoveredId, setHoveredId] = useState<number | null>(null);
	const [selectedId, setSelectedId] = useState<number | null>(null);

	useEffect(() => {
		fetch(`${baseURL}/api/exospine/id-title`)
			.then((response) => response.json())
			.then((data) => {
				const normalized = (Array.isArray(data) ? data : [])
					.map(
						(d: {
							Exospine_id: number;
							Exospine_title_fr: string;
							Exospine_title_en: string;
						}) => ({
							id: d.Exospine_id,
							Exospine_title_fr: d.Exospine_title_fr,
							Exospine_title_en: d.Exospine_title_en,
						}),
					)
					.filter((d) => Number.isFinite(d.id));
				setExospines(normalized);
			})
			.catch((error) => {
				console.error("Error fetching exospines:", error);
			});
	}, [baseURL]);
	console.log(exospines);

	return (
		<section id="containerExospineFilter">
			<article id="level-filter" className="filter">
				<p className="filter-title">Niveau :</p>
				<section className="exospine-bar">
					{[0, 1, 2].map((idx) => {
						const activeId = hoveredId !== null ? hoveredId : selectedId;
						return (
							<button
								key={idx}
								type="button"
								className={
									activeId !== null && idx <= activeId ? "bar-on" : "bar-off"
								}
								onMouseEnter={() => setHoveredId(idx)}
								onMouseLeave={() => setHoveredId(null)}
								onClick={() => setSelectedId(idx)}
							/>
						);
					})}
				</section>
			</article>
			<article id="mk2-filter" className="filter">
				<p className="filter-title">Mk2</p>
				<select name="mk2" id="mk2" className="select-filter">
					<option value="all">Tous</option>
					<option value="onlyMk2">Uniquement Mk2</option>
					<option value="withMk2">Avec Mk2</option>
					<option value="withoutMk2">Sans Mk2</option>
				</select>
			</article>
			<article id="type-filter" className="filter">
				<p className="filter-title">Type :</p>
				<select name="type" id="type" className="select-filter">
					{exospines.map((exospine) => (
						<option key={exospine.id} value={exospine.id}>
							{exospine.Exospine_title_fr}
						</option>
					))}
				</select>
			</article>
			<button type="button" id="apply-filter" className="filter">
				Valider
			</button>
			<button type="button" id="reset-filter" className="filter">
				Réinitialiser
			</button>
		</section>
	);
}
