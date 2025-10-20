"use client";
import "./home.css";
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

interface subSectionProps {
	className?: string;
	setOpenNavProps?: (open: boolean) => void;
	insideNav?: boolean; // <-- nouveau: true quand rendu depuis NavMobile>SectionBtn
	alwaysVisible?: boolean; // <-- optionnel override si besoin
}

export default function SubSection({
	className,
	setOpenNavProps,
	insideNav = false,
	alwaysVisible = false,
}: subSectionProps) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [subSections, setSubSections] = useState<Section[]>([]);
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const [isMobile, setIsMobile] = useState(false);
	const [isBelow1400, setIsBelow1400] = useState(false);
	const [isLarge, setIsLarge] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		setIsMobile(window.innerWidth < 768);
		setIsBelow1400(window.innerWidth < 1400);
		setIsLarge(window.innerWidth >= 1400);
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
			setIsBelow1400(window.innerWidth < 1400);
			setIsLarge(window.innerWidth >= 1400);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

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
				setSubSections(mapped);
			})
			.catch((error) => {
				console.error(
					"Erreur lors de la récupération des sous-sections :",
					error,
				);
			});
	}, [baseURL]);

	// Défensif : n'affiche rien côté page sauf si insideNav ou override alwaysVisible
	if (!mounted) return null;
	if (!insideNav && !alwaysVisible && !isLarge) return null;

	return (
		<section
			className={`containerSubSection mobile${className ? ` ${className}` : ""}`}
		>
			{subSections.map((subSection: Section, idx: number) => (
				<div
					className="subSection mobile"
					key={`${subSection.id ?? "sub"}-${idx}`}
					onClick={() => isMobile && setOpenNavProps && setOpenNavProps(false)}
					onKeyDown={(e) => {
						if (
							(e.key === "Enter" || e.key === " ") &&
							isMobile &&
							setOpenNavProps
						) {
							e.preventDefault();
							setOpenNavProps(false);
						}
					}}
				>
					<Link href={`/arsenal/${subSection.link}`}>
						<div
							onMouseEnter={() => setHoveredIndex(idx)}
							onMouseLeave={() => setHoveredIndex(null)}
							className="sectionNanoSuits mobile"
						>
							<div className="nanoSuitsdeco mobile">
								<span
									className="nanoSuitsdeco_0 mobile"
									style={{
										background:
											hoveredIndex === idx
												? "var(--white)"
												: "var(--lightdenim)",
									}}
								/>
								<span className="nanoSuitsdeco_1 mobile" />
								<span className="nanoSuitsdeco_2 mobile" />
							</div>
							<Image
								className="nanoSuitsIcon mobile"
								src={
									isMobile
										? subSection.icons_black
										: hoveredIndex === idx
											? subSection.icons_gray
											: subSection.icons_black
								}
								alt="Arsenal Icon"
								width={24}
								height={24}
							/>
							<div className="btnNanoSuits mobile">
								<p
									className="subSectionTitle mobile"
									style={{
										color:
											window.innerWidth < 768
												? "var(--black)"
												: hoveredIndex === idx
													? "var(--white)"
													: "var(--black)",
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
