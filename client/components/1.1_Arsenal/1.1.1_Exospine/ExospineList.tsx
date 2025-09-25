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
	const toUrl = (p: string) => {
		if (!p) return "/assets/images/placeholder.png"; // image par défaut
		if (p.startsWith("http")) return p;
		if (!baseURL) return p; // ou retourne une image par défaut
		return `${baseURL}${p}`;
	};

	const [exospines, setExospines] = useState<ExospineProps[]>([]);
	const [hoveredId, setHoveredId] = useState<number | null>(null);

	useEffect(() => {
		fetch(`${baseURL}/api/exospine/id-title`)
			.then((response) => response.json())
			.then((data) => {
				setExospines(data);
			})
			.catch((error) => {
				console.error("Error fetching exospines:", error);
			});
	}, [baseURL]);
	console.log(exospines);

	return (
		<div>
			<p className="titleSubSection_orange">
				EXOSPINE <span>&gt;</span>
			</p>
			<div className="containerList">
				<ul>
					{exospines.map((exospine) => (
						<li key={exospine.id} className="ListLi_orange">
							<button
								type="button"
								className="listButton"
								onClick={() => onSelect(exospine.id)}
							>
								<Image
									className="apparelIcon_orange"
									src={toUrl(exospine.Exospine_icon)}
									alt="Arsenal Icon"
									width={70}
									height={70}
								/>
								<p className="listName">
									{exospine.Exospine_title_fr || "Titre manquant"}
								</p>
							</button>
							<AddFavorite exo={exospine.id.toString()} />
						</li>
					))}
				</ul>
				<div className="listArrow orange">
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
