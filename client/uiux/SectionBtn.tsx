"use client";
import "./SectionBtn.css";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Section {
	id: number;
	title: string;
	icons_gray: string;
	icons_black: string;
}

export default function SectionArsenalBtn() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [sections, setSections] = useState<Section[]>([]);
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		fetch(`${baseURL}/api/sections`)
			.then((response) => response.json())
			.then((data) => {
				interface ApiSection {
					Section_id: number;
					Section_title: string;
					Section_icons_gray: string;
					Section_icons_black: string;
				}
				const mapped = (data as ApiSection[]).map((section) => ({
					id: section.Section_id,
					title: section.Section_title,
					icons_gray: baseURL + section.Section_icons_gray,
					icons_black: baseURL + section.Section_icons_black,
				}));

				// Traitez les données des sections ici
				setSections(mapped);
			})
			.catch((error) => {
				console.error("Erreur lors de la récupération des sections :", error);
			});
	}, [baseURL]);

	return (
		<section id="containerSectionArsenal">
			{sections.map((section: Section, idx: number) => (
				<div
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}
					className="sectionArsenal"
					key={section.id}
				>
					<div className="arsenaldeco">
						<span className="arsenaldeco_1" />
						<span className="arsenaldeco_2" />
					</div>
					{/*<div id="arsenalborder">*/}
					<div className="btnArsenal">
						<p
							style={{
								color: hoveredIndex === idx ? "var(--white)" : "var(--black)",
							}}
						>
							{section.title}
						</p>
					</div>
					{/*</div>*/}
					<Image
						className="arsenalIcon"
						src={
							hoveredIndex === idx ? section.icons_black : section.icons_gray
						}
						alt="Arsenal Icon"
						width={96}
						height={96}
					/>
				</div>
			))}
		</section>
	);
}
