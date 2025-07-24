"use client";

import "./CarrouselNanoSuits.css";
import Image from "next/image";
import { useState } from "react";

export default function CarrouselNanoSuits() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nanoSuits = [
		{
			id: 1,
			name: "Alice ensoleillée",
			image: "/assets/nano-suits/Alice_ensoleillee.webp",
			text1: "Permet de modifier l'apparence d'EVE.",
			text2:
				"Découvrez la collection de maillots de bain ensoleillée de Tetrastar C&T: partez en vacances au Pays des merveilles !",
			Where: "Où la trouver ?",
			Place: "Dans la boutique de Tetrastar C&T",
		},
		{
			id: 2,
			name: "Aventurière des terres désolée",
			image: "/assets/nano-suits/Aventuriere_des_terres_desolee.webp",
			text1: "Permet de modifier l'apparence d'EVE.",
			text2:
				"Personne ne peut vous arrêter, Traversez les zones hostiles et franchissez les obstacles avec la tenue Aventurière. Bien entendu, n'allez pas chercher de poux dans la tête des Naytibas.",
			Where: "Où la trouver ?",
			Place: "Dans la boutique de Tetrastar C&T",
		},
		{
			id: 3,
			name: "Bikini de plongée Vague",
			image: "/assets/nano-suits/Bikini_de_plongée_Vague.webp",
			text1: "Permet de modifier l'apparence d'EVE.",
			text2:
				"Suite à la disparition mystérieuse de 'Galaxy' Alan de Tetrastar C&T,  'Kitsune' Maria a repris sa position vacante afin de préserver les valeurs de l'entreprise. Maria a ensuite présenté 'Vague', une nouvelle marque respectueuse de l'environnement axée sur la durabilité, qui n'utilise que des matériaux polymères provenant de filets de pêche recyclés. Elle a alors lancé sa collection de maillots de bain, marquant le début de l'ascension inarrêtable de sa carrière.",
			Where: "Où la trouver ?",
			Place: "Dans la boutique de Tetrastar C&T",
		},
	];

	const suit = nanoSuits[currentIndex];

	return (
		<div id="containerCarrouselNanoSuits">
			<div>
				<button
					type="button"
					onClick={() =>
						setCurrentIndex((i) => (i > 0 ? i - 1 : nanoSuits.length - 1))
					}
				>
					Précédent
				</button>
				<button
					type="button"
					onClick={() =>
						setCurrentIndex((i) => (i < nanoSuits.length - 1 ? i + 1 : 0))
					}
				>
					Suivant
				</button>
			</div>
			<div id="nanoSuitCarrouselCard" key={suit.id}>
				<div className="nanoSuitCarrouselDetails">
					<p id="nanoSuitCarrouselName">{suit.name}</p>
					<p id="nanoSuitCarrouselText1">{suit.text1}</p>
					<p id="nanoSuitCarrouselText2">{suit.text2}</p>
					<p id="nanoSuitCarrouselWhere">{suit.Where}</p>
					<p id="nanoSuitCarrouselPlace">{suit.Place}</p>
				</div>
				<Image
					id="nanoSuitCarrouselImage"
					src={suit.image}
					alt={suit.name}
					width={623}
					height={623}
				/>
			</div>
		</div>
	);
}
