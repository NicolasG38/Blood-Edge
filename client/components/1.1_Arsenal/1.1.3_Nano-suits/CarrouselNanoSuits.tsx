"use client";

import "./CarrouselNanoSuits.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { JSX } from "react";

interface NanoSuitProps {
	id: number;
	NS_id: number;
	NS_title_fr: string;
	NS_text_1_fr: string;
	NS_text_1_en: string;
	NS_text_2_fr: string;
	NS_text_2_en: string;
	NS_Where_title_fr: string;
	NS_Where_title_en: string;
	NS_Where_text_fr: string;
	NS_Where_text_en: string;
	NS_picture: string;
	NS_stars: string;
}

interface CarrouselNanoSuitsProps {
	selectedId: number | null;
}

export default function CarrouselNanoSuits({
	selectedId,
}: CarrouselNanoSuitsProps) {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const [nanoSuitsServer, setNanoSuitsServer] = useState<NanoSuitProps[]>([]);

	useEffect(() => {
		fetch(`${baseURL}/api/nanosuits`)
			.then((response) => response.json())
			.then((data) => {
				const mapped = data.map((suit: NanoSuitProps) => ({
					...suit,
					id: suit.id ?? suit.NS_id,
				}));
				setNanoSuitsServer(mapped);
			})
			.catch((err) => {
				console.error("Erreur côté client :", err);
			});
	}, [baseURL]);

	const suit =
		nanoSuitsServer.find((s) => s.id === Number(selectedId)) ||
		nanoSuitsServer[0];
	if (!suit) {
		return <div>Chargement des données...</div>;
	}

	return (
		<div id="containerCarrouselNanoSuits">
			<div id="nanoSuitCarrouselCard" key={suit.id}>
				<div className="nanoSuitCarrouselDetails">
					<div className="nanoSuitCarrouselStars">
						<Image
							id="nanoSuitCarrouselStars"
							src={baseURL + suit.NS_stars}
							alt={`Étoiles pour ${suit.NS_title_fr}`}
							width={30}
							height={30}
						/>
						<Image
							id="nanoSuitCarrouselStars"
							src={baseURL + suit.NS_stars}
							alt={`Étoiles pour ${suit.NS_title_fr}`}
							width={30}
							height={30}
						/>
						<Image
							id="nanoSuitCarrouselStars"
							src={baseURL + suit.NS_stars}
							alt={`Étoiles pour ${suit.NS_title_fr}`}
							width={30}
							height={30}
						/>
					</div>
					<p id="nanoSuitCarrouselName">{suit.NS_title_fr}</p>
					<p id="nanoSuitCarrouselText1">{suit.NS_text_1_fr}</p>
					<p id="nanoSuitCarrouselText2">{suit.NS_text_2_fr}</p>
					<p id="nanoSuitCarrouselWhere">{suit.NS_Where_title_fr}</p>
					<p id="nanoSuitCarrouselPlace">{suit.NS_Where_text_fr}</p>
				</div>
				<Image
					id="nanoSuitCarrouselImage"
					src={`${baseURL}${suit.NS_picture.startsWith("/") ? "" : "/"}${suit.NS_picture}`}
					alt={suit.NS_title_fr}
					width={623}
					height={623}
				/>
			</div>
		</div>
	);
}
