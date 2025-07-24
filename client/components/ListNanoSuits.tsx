"use client";
import "./ListNanoSuits.css";
import Image from "next/image";
import { useState } from "react";

export default function ListNanoSuits() {
	const nanoSuits = [
		{
			id: 1,
			name: "Alice ensoleillée",
			image: "/assets/nano-suits/Alice_ensoleillée.webp",
			text1: "Permet de modifier l'apparence d'EVE.",
			text2:
				"Découvrez la collection de maillots de bain ensoleillée de Tetrastar C&T: partez en vacances au Pays des merveilles !",
		},
		{
			id: 2,
			name: "Aventurière des terres désolée",
			image: "/assets/nano-suits/Aventurière_des_terres_désolée.webp",
			text1: "Permet de modifier l'apparence d'EVE.",
			text2:
				"Personne ne peut vous arrêter, Traversez les zones hostiles et franchissez les obstacles avec la tenue Aventurière. Bien entendu, n'allez pas chercher de poux dans la tête des Naytibas.",
		},
		{
			id: 3,
			name: "Bikini de plongée Vague",
			image: "/assets/nano-suits/Bikini_de_plongée_Vague.webp",
			text1: "Permet de modifier l'apparence d'EVE.",
			text2:
				"Suite à la disparition mystérieuse de &laquo; Galaxy &laquo; Alan de Tetrastar C&T, &laquo; Kitsune &raquo; Maria a repris sa position vacante afin de préserver les valeurs de l'entreprise. Maria a ensuite présenté &laquo; Vague &raquo;, une nouvelle marque respectueuse de l'environnement axée sur la durabilité, qui n'utilise que des matériaux polymères provenant de filets de pêche recyclés. Elle a alors lancé sa collection de maillots de bain, marquant le début de l'ascension inarrêtable de sa carrière.",
		},
	];

	const [hoveredId, setHoveredId] = useState<number | null>(null);
	return (
		<div id="containerListNanoSuits">
			<ul id="nanoSuitsListUl">
				{nanoSuits.map((suit) => (
					<li
						key={suit.id}
						className="nanoSuitlistLi"
						onMouseEnter={() => setHoveredId(suit.id)}
						onMouseLeave={() => setHoveredId(null)}
					>
						<span
							className="nanoSuitDeco_1"
							style={{
								background:
									hoveredId === suit.id ? "var(--lightdenim)" : "var(--white)",
							}}
						/>
						<Image
							className="apparelIcon"
							src={
								hoveredId === suit.id
									? "/assets/icons/apparel_black.svg"
									: "/assets/icons/apparel.svg"
							}
							alt="Arsenal Icon"
							width={70}
							height={70}
						/>
						<p className="nanoSuitName">{suit.name}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
