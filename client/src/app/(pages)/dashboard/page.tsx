"use client";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import "./DashboardPage.css";
import { useState, useEffect } from "react";
import Image from "next/image";

interface NanoSuit {
	NS_id: number;
	NS_title: string;
	image: string;
	name: string;
}

export default function DashboardPage() {
	const [pseudo, setPseudo] = useState("");
	const [hoveredId, setHoveredId] = useState<number | null>(null);
	const [nanoSuits, setNanoSuits] = useState<NanoSuit[]>([]);
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedPseudo = localStorage.getItem("pseudoStorage");
			if (storedPseudo) setPseudo(storedPseudo);
		}
	}, []);

	useEffect(() => {
		fetch(`${baseURL}/api/nanosuits`)
			.then((response) => response.json())
			.then((data) => {
				setNanoSuits(data);
			});
	}, [baseURL]);

	return (
		<>
			<Header />
			<main>
				<h1 id="dashboardTitle">Hello, {pseudo}</h1>
				<p id="favoritesTitle">Vos favoris</p>
				<div id="favoritesList">
					{" "}
					<div id="containerListNanoSuits">
						<ul id="nanoSuitsListUl">
							{nanoSuits.map((suit) => (
								<li
									key={suit.NS_id}
									className="nanoSuitlistLi"
									onMouseEnter={() => setHoveredId(suit.NS_id)}
									onMouseLeave={() => setHoveredId(null)}
								>
									<span
										className="nanoSuitDeco_1"
										style={{
											background:
												hoveredId === suit.NS_id
													? "var(--lightdenim)"
													: "var(--white)",
										}}
									/>
									<Image
										className="apparelIcon"
										src={
											hoveredId === suit.NS_id
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
				</div>
			</main>
			<Footer />
		</>
	);
}
