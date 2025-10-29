"use client";
import "../List.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "../../../context/LangContext";
import AddFavorite from "../../../uiux/AddFavorite";

interface NanoSuitProps {
	id: number;
	title_fr: string;
	title_en: string; // Ajouté pour le titre en anglais
}
interface ListNanoSuitsProps {
	onSelect: (id: number) => void;
}

export default function ListNanoSuits({ onSelect }: ListNanoSuitsProps) {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const [nanoSuits, setNanoSuits] = useState<NanoSuitProps[]>([]);
	const { lang } = useLanguage();

	useEffect(() => {
		fetch(`${baseURL}/api/nanosuits/id-title`)
			.then((response) => response.json())
			.then((data) => {
				const nanoSuitsArray = Array.isArray(data) ? data : [];
				if (Array.isArray(data)) {
					setNanoSuits(
						nanoSuitsArray.map((d: NanoSuitProps) => ({
							id: d.id,
							title_fr: d.title_fr,
							title_en: d.title_en, // Ajouté pour le titre en anglais
						})),
					);
				} else if (Array.isArray(data.nanoSuits)) {
					setNanoSuits(data.nanoSuits);
				} else {
					setNanoSuits([]);
					console.error("La réponse n'est pas un tableau :", data);
				}
			})
			.catch((error) => {
				console.error("Error fetching nano suits:", error);
			});
	}, [baseURL]);
	const [hoveredId, setHoveredId] = useState<number | null>(null);

	const filteredNanoSuits = nanoSuits.filter((suit) =>
		lang === "fr" ? !!suit.title_fr : !!suit.title_en,
	);

	return (
		<div>
			<p className="titleSubSection_blue">
				{lang === "fr" ? "NANO-COMBINAISON" : "NANO-SUIT"} <span>&gt;</span>
			</p>
			<div className="containerList">
				<ul>
					{filteredNanoSuits.map((suit) => (
						<li
							key={suit.id}
							className="listLi_blue"
							onMouseEnter={() => setHoveredId(suit.id)}
							onMouseLeave={() => setHoveredId(null)}
						>
							<button
								type="button"
								className="listButton"
								onClick={() => {
									onSelect(suit.id);
								}}
							>
								<span
									className="deco_1_blue"
									style={{
										background:
											hoveredId === suit.id
												? "var(--lightdenim)"
												: "var(--white)",
									}}
								/>
								<Image
									className="apparelIcon_blue"
									src={
										hoveredId === suit.id
											? "/assets/icons/apparel_black.svg"
											: "/assets/icons/apparel.svg"
									}
									alt="Arsenal Icon"
									width={70}
									height={70}
								/>
								<p className="listName">
									{lang === "fr" ? suit.title_fr : suit.title_en}
								</p>
							</button>
							<AddFavorite objet_id={suit.id} />
						</li>
					))}
				</ul>
				<div className="listArrow">
					<Image
						src="/assets/icons/stat_2_blue.svg"
						alt="Nano suits list arrow top"
						width={300}
						height={300}
					/>

					<Image
						src="/assets/icons/stat_minus_2_blue.svg"
						alt="Nano suits list arrow bottom"
						width={300}
						height={300}
					/>
				</div>
			</div>
		</div>
	);
}
