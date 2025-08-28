"use client";
import "../List.css";
import AddFavorite from "../../../uiux/AddFavorite";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ExospineProps {
	id: number;
	Exospine_title_fr: string;
	Exospine_title_en: string;
	Exospine_icon: string;
	Exospine_icon_colored: string;
	Exospine_icon_Mk2: string;
	Exospine_icon_Mk2_colored: string;
}

interface ExospineListProps {
	selectedId: number | null;
	onSelect: (id: number | null) => void;
}

export default function ExospineList({
	selectedId,
	onSelect,
}: ExospineListProps) {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const toUrl = (p: string) => (p?.startsWith("http") ? p : `${baseURL}${p}`);

	const [exospines, setExospines] = useState<ExospineProps[]>([]);
	const [hoveredId, setHoveredId] = useState<number | null>(null);

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
							Exospine_icon: string;
							Exospine_icon_colored: string;
							Exospine_icon_Mk2: string;
							Exospine_icon_Mk2_colored: string;
						}) => ({
							id: d.Exospine_id,
							Exospine_title_fr: d.Exospine_title_fr,
							Exospine_title_en: d.Exospine_title_en,
							Exospine_icon: d.Exospine_icon,
							Exospine_icon_colored: d.Exospine_icon_colored,
							Exospine_icon_Mk2: d.Exospine_icon_Mk2,
							Exospine_icon_Mk2_colored: d.Exospine_icon_Mk2_colored,
						}),
					)
					.filter((d) => Number.isFinite(d.id));
				setExospines(normalized);
			})
			.catch((error) => {
				console.error("Error fetching exospines:", error);
			});
	}, [baseURL]);

	return (
		<div>
			<p className="titleSubSection_orange">
				EXOSPINE <span>&gt;</span>
			</p>
			<div className="containerList">
				<ul>
					{exospines.map((exospine) => (
						<li
							key={exospine.id}
							className="ListLi_orange"
							onMouseEnter={() => setHoveredId(exospine.id)}
							onMouseLeave={() => setHoveredId(null)}
						>
							<button
								type="button"
								className="listButton"
								onClick={() => onSelect(exospine.id)}
							>
								<span
									className="deco_1_orange"
									style={{
										background:
											hoveredId === exospine.id
												? "var(--lightblack)"
												: "var(--white)",
									}}
								/>
								<Image
									className="apparelIcon_orange"
									src={toUrl(
										hoveredId === exospine.id
											? exospine.Exospine_icon_colored ||
													exospine.Exospine_icon_Mk2_colored
											: exospine.Exospine_icon || exospine.Exospine_icon_Mk2,
									)}
									alt="Arsenal Icon"
									width={70}
									height={70}
								/>
								<p className="listName">{exospine.Exospine_title_fr}</p>
							</button>
							<AddFavorite exo={exospine.id.toString()} />
						</li>
					))}
				</ul>
				<div className="listArrow">
					<Image
						src="/assets/icons/stat_2_orange.svg"
						alt="Nano suits list arrow top"
						width={300}
						height={300}
					/>

					<Image
						src="/assets/icons/stat_minus_2_orange.svg"
						alt="Nano suits list arrow bottom"
						width={300}
						height={300}
					/>
				</div>
			</div>
		</div>
	);
}
