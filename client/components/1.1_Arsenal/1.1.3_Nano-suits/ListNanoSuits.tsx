"use client";
import "../List.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import AddFavorite from "../../../uiux/AddFavorite";

interface NanoSuitProps {
	id: number;
	NS_title_fr: string;
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
				if (Array.isArray(data)) {
					setNanoSuits(data);
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
	return (
		<div>
			<p className="titleSubSection_blue">
				NANO-COMBINAISON <span>&gt;</span>
			</p>
			<div className="containerList">
				<ul>
					{nanoSuits.map((suit) => (
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
								<p className="listName">{suit.NS_title_fr}</p>
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
