"use client";
import "./SubSection.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Section {
	id: number;
	title: string;
	icons_gray: string;
	icons_black: string;
	link: string;
}

export default function SubSection() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [subSections, setSubSections] = useState<Section[]>([]);
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		fetch(`${baseURL}/api/subsections`)
			.then((response) => response.json())
			.then((data) => {
				interface ApiSection {
					Arsenal_id: number;
					Arsenal_title: string;
					Arsenal_icons_gray: string;
					Arsenal_icons_black: string;
					Arsenal_link: string;
				}
				const mapped = (data as ApiSection[]).map((section) => ({
					id: section.Arsenal_id,
					title: section.Arsenal_title,
					icons_gray: baseURL + section.Arsenal_icons_gray,
					icons_black: baseURL + section.Arsenal_icons_black,
					link: section.Arsenal_link,
				}));
				console.log(
					"ids:",
					mapped.map((s) => s.link),
				);
				setSubSections(mapped);
			})
			.catch((error) => {
				console.error(
					"Erreur lors de la récupération des sous-sections :",
					error,
				);
			});
	}, [baseURL]);

	return (
		<section id="containerSubSection">
			{subSections.map((subSection: Section, idx: number) => (
				<div className="subSection" key={subSection.id}>
					<Link href={`/arsenal/${subSection.link}`}>
						<div
							onMouseEnter={() => setHoveredIndex(idx)}
							onMouseLeave={() => setHoveredIndex(null)}
							className="sectionNanoSuits"
						>
							<div className="nanoSuitsdeco">
								<span
									className="nanoSuitsdeco_0"
									style={{
										background:
											hoveredIndex === idx
												? "var(--white)"
												: "var(--lightdenim)",
									}}
								/>
								<span className="nanoSuitsdeco_1" />
								<span className="nanoSuitsdeco_2" />
							</div>
							<Image
								className="nanoSuitsIcon"
								src={
									hoveredIndex === idx
										? subSection.icons_gray
										: subSection.icons_black
								}
								alt="Arsenal Icon"
								width={24}
								height={24}
							/>
							<div className="btnNanoSuits">
								<p
									className="subSectionTitle"
									style={{
										color:
											hoveredIndex === idx ? "var(--white)" : "var(--black)",
									}}
								>
									{subSection.title}
								</p>
							</div>
						</div>
					</Link>
				</div>
			))}
		</section>
	);
}
