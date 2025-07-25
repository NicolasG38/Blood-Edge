"use client";

import "./CarrouselNanoSuits.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { JSX } from "react";

interface NanoSuitProps {
	id: number;
	NS_id: number;
	NS_title: string;
	NS_text: string;
	NS_text_2: string;
	NS_Where_title: string;
	NS_Where_text: string;
	NS_picture: string;
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
	console.log("nanoSuitsServer:", nanoSuitsServer);
	console.log("selectedId:", selectedId);
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
					<p id="nanoSuitCarrouselName">{suit.NS_title}</p>
					<p id="nanoSuitCarrouselText1">{suit.NS_text}</p>
					<p id="nanoSuitCarrouselText2">{suit.NS_text_2}</p>
					<p id="nanoSuitCarrouselWhere">{suit.NS_Where_title}</p>
					<p id="nanoSuitCarrouselPlace">{suit.NS_Where_text}</p>
				</div>
				<Image
					id="nanoSuitCarrouselImage"
					src={`${baseURL}${suit.NS_picture.startsWith("/") ? "" : "/"}${suit.NS_picture}`}
					alt={suit.NS_title}
					width={623}
					height={623}
				/>
			</div>
		</div>
	);
}
