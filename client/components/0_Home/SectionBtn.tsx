"use client";
import "./home.css";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Section {
	id: number;
	title: string;
	icons_gray: string;
	icons_black: string;
	arrow: string;
}

interface SectionBtnProps {
	className?: string;
}

export default function SectionArsenalBtn({ className }: SectionBtnProps) {
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
					Section_arrow: string;
				}
				const mapped = (data as ApiSection[]).map((section) => ({
					id: section.Section_id,
					title: section.Section_title,
					icons_gray: baseURL + section.Section_icons_gray,
					icons_black: baseURL + section.Section_icons_black,
					arrow: baseURL + section.Section_arrow,
				}));

				// Traitez les données des sections ici
				setSections(mapped);
			})
			.catch((error) => {
				console.error("Erreur lors de la récupération des sections :", error);
			});
	}, [baseURL]);

	return (
		<section className={`containerSectionArsenal mobile ${className}`}>
			{sections.map((section: Section, idx: number) => (
				<div
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}
					className="sectionArsenal mobile"
					key={section.id}
				>
					<div className="arsenaldeco mobile">
						<span className="arsenaldeco_1 mobile" />
						<span className="arsenaldeco_2 mobile" />
					</div>
					{/*<div id="arsenalborder">*/}
					<div className="btnArsenal mobile">
						<p
							style={
								window.innerWidth >= 768
									? {
											color:
												hoveredIndex === idx ? "var(--white)" : "var(--black)",
										}
									: undefined
							}
						>
							{section.title}
						</p>
					</div>

					<Image
						className="arsenalIcon mobile"
						src={
							window.innerWidth >= 768
								? hoveredIndex === idx
									? section.icons_black
									: section.icons_gray
								: section.icons_gray
						}
						alt="Arsenal Icon"
						width={96}
						height={96}
					/>
					<Image
						className="arsenalarrow mobile"
						src={section.arrow}
						alt="Arsenal Icon"
						width={64}
						height={64}
						style={window.innerWidth <= 768 ? {} : { display: "none" }}
					/>
				</div>
			))}
		</section>
	);
}
