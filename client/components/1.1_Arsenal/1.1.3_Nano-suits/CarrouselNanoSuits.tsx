"use client";

import "./CarrouselNanoSuits.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "../../../context/LangContext";

interface NanoSuitProps {
	id: number;
	picture: string;
	stars: string;
	star_gray: string;
	star_1: boolean | string;
	star_2: boolean | string;
	star_3: boolean | string;
	title: string;
	text_1: string;
	text_2: string;
	where_title: string;
	where_text: string;
}

interface CarrouselNanoSuitsProps {
	selectedId: number | null;
}

export default function CarrouselNanoSuits({
	selectedId,
}: CarrouselNanoSuitsProps) {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const { lang } = useLanguage();
	const [nanoSuitsServer, setNanoSuitsServer] = useState<NanoSuitProps[]>([]);

	useEffect(() => {
		fetch(`${baseURL}/api/nanosuits`)
			.then((response) => response.json())
			.then((data) => {
				const suitsArray = data[lang] ?? [];
				const mapped = suitsArray.map((suit: NanoSuitProps) => ({
					id: suit.id,
					picture: suit.picture,
					stars: suit.stars,
					star_gray: suit.star_gray,
					star_1: suit.star_1 === "true" || suit.star_1 === true,
					star_2: suit.star_2 === "true" || suit.star_2 === true,
					star_3: suit.star_3 === "true" || suit.star_3 === true,
					title: suit.title,
					text_1: suit.text_1,
					text_2: suit.text_2,
					where_title: suit.where_title,
					where_text: suit.where_text,
				}));
				setNanoSuitsServer(mapped);
				console.log("Données des nano-suits récupérées :", mapped);
				console.log("Langue courante :", lang);
				console.log("Réponse backend :", data);
			})
			.catch((err) => {
				console.error("Erreur côté client :", err);
			});
	}, [baseURL, lang]);

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
						{[1, 2, 3].map((i) => (
							<Image
								key={i}
								id="nanoSuitCarrouselStars"
								src={
									(i === 1 && suit.star_1) ||
									(i === 2 && suit.star_2) ||
									(i === 3 && suit.star_3)
										? `${baseURL}${suit.stars}`
										: `${baseURL}${suit.star_gray}`
								}
								alt={`Étoile ${i} pour ${suit.title}`}
								width={30}
								height={30}
							/>
						))}
					</div>
					<p id="nanoSuitCarrouselName">{suit.title}</p>
					<p id="nanoSuitCarrouselText1">{suit.text_1}</p>
					<p id="nanoSuitCarrouselText2">{suit.text_2}</p>
					<p id="nanoSuitCarrouselWhere">{suit.where_title}</p>
					<p id="nanoSuitCarrouselPlace">{suit.where_text}</p>
				</div>
				{suit.picture && (
					<Image
						id="nanoSuitCarrouselImage"
						src={`${baseURL}${suit.picture}`}
						alt={suit.title}
						width={623}
						height={623}
					/>
				)}
			</div>
		</div>
	);
}
