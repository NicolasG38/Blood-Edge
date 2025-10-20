"use client";
import React from "react";
import "./home.css";
import Image from "next/image";
import SubSection from "./SubSection";
import { useMenuMobile } from "../../context/MenuMobileContext";
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
	children?: React.ReactNode;
	setOpenNavProps?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChildWithNavProps extends React.ReactElement {
	props: {
		setOpenNavProps?: React.Dispatch<React.SetStateAction<boolean>>;
		// autres props éventuelles
	};
}

export default function SectionBtn({
	className,
	children,
	setOpenNavProps,
}: SectionBtnProps) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [sections, setSections] = useState<Section[]>([]);
	const [isMobile, setIsMobile] = useState(false);
	const [isBelow1400, setIsBelow1400] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [arsenalOpen, setArsenalOpen] = useState(false);
	const { openMenu, setOpenMenu } = useMenuMobile();
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		setMounted(true);
		const updateSizes = () => {
			setIsMobile(window.innerWidth < 768);
			setIsBelow1400(window.innerWidth < 1400);
		};
		updateSizes();
		window.addEventListener("resize", updateSizes);
		return () => window.removeEventListener("resize", updateSizes);
	}, []);

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

				setSections(mapped);
			})
			.catch((error) => {
				console.error("Erreur lors de la récupération des sections :", error);
			});
	}, [baseURL]);

	// fermer le sous-menu local quand le menu mobile global se ferme
	useEffect(() => {
		if (!openMenu) setArsenalOpen(false);
	}, [openMenu]);

	// proxy qui accepte boolean | (prev=>boolean) mais n'envoie jamais une fonction à setOpenMenu
	const proxySetOpenNav = (value: boolean | ((prev: boolean) => boolean)) => {
		if (typeof value === "function") {
			// évalue la fonction avec l'état courant au lieu de la passer à setOpenMenu
			setOpenMenu((value as (prev: boolean) => boolean)(openMenu));
		} else {
			setOpenMenu(value);
		}
	};

	// Attendre le montage client avant d'afficher quoi que ce soit
	if (!mounted) return null;

	return (
		<section
			className={`containerSectionArsenal mobile ${className} ${openMenu ? "open" : ""}`}
		>
			{sections.map((section: Section, idx: number) => (
				<React.Fragment key={section.id}>
					<div
						onMouseEnter={() => setHoveredIndex(idx)}
						onMouseLeave={() => setHoveredIndex(null)}
						className="sectionArsenal mobile"
					>
						{/* ...bouton Arsenal... */}
						<div className="arsenaldeco mobile">
							<span className="arsenaldeco_1 mobile" />
							<span className="arsenaldeco_2 mobile" />
						</div>
						<div className="btnArsenal mobile">
							<p
								style={
									!isMobile
										? {
												color:
													hoveredIndex === idx
														? "var(--white)"
														: "var(--black)",
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
								!isMobile
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
							onClick={() =>
								section.id === 1 && setArsenalOpen((prev) => !prev)
							}
							// visible uniquement en mode "mobile" tactile (<=768)
							style={isMobile ? {} : { display: "none" }}
						/>
					</div>

					{/* Affiche les enfants seulement si arsenalOpen est true ET si écran < 1400px */}
					{section.id === 1 && arsenalOpen && isBelow1400 ? (
						Array.isArray(children) && children.length > 0 ? (
							children.map((child, childIdx) => {
								if (React.isValidElement(child)) {
									const element = child as React.ReactElement;
									const childKey: React.Key =
										element.key ?? `child-${childIdx}`;
									return React.cloneElement(element as ChildWithNavProps, {
										setOpenNavProps: proxySetOpenNav,
										key: childKey,
									});
								}
								return child;
							})
						) : (
							// si pas d'enfant fourni, SectionBtn rend SubSection lui-même
							<SubSection insideNav={true} setOpenNavProps={proxySetOpenNav} />
						)
					) : null}
				</React.Fragment>
			))}
		</section>
	);
}
