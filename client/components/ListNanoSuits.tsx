"use client";
import "./ListNanoSuits.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import AddFavorite from "../uiux/AddFavorite";
import Link from "next/link";

interface NanoSuitProps {
	id: number;
	NS_title: string;
}
interface ListNanoSuitsProps {
	onSelect: (id: number) => void;
}

export default function ListNanoSuits({ onSelect }: ListNanoSuitsProps) {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const [nanoSuits, setNanoSuits] = useState<NanoSuitProps[]>([]);

	useEffect(() => {
		fetch(`${baseURL}/api/nanosuits/id-title`)
			.then((response) => response.json())
			.then((data) => {
				console.log("nanoSuits data:", data);
				setNanoSuits(data);
			})
			.catch((error) => {
				console.error("Error fetching nano suits:", error);
			});
		// Note: If you want to set the fetched data to a state, you can
	}, [baseURL]);

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
						<button
							type="button"
							className="nanoSuitButton"
							onClick={() => {
								console.log("Selected id:", suit.id);
								onSelect(suit.id);
							}}
						>
							<span
								className="nanoSuitDeco_1"
								style={{
									background:
										hoveredId === suit.id
											? "var(--lightdenim)"
											: "var(--white)",
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
							<p className="nanoSuitName">{suit.NS_title}</p>
						</button>
						<AddFavorite nanoSuitId={suit.id.toString()} />
					</li>
				))}
			</ul>
		</div>
	);
}
