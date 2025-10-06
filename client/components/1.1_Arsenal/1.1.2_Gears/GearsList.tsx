"use client";
import "../List.css";
import AddFavorite from "../../../uiux/AddFavorite";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LangContext";

interface GearsItem {
	Gears_icon: string;
	Gears_icon_Mk2: string;
	Gears_icon_Mk2_colored: string;
	Gears_icon_colored: string;
	Gears_skill_1: string;
	Gears_skill_2: string;
	Gears_star: string;
	Gears_star_1: boolean;
	Gears_star_2: boolean;
	Gears_star_3: boolean;
	Gears_star_colored: string;
	Gears_text_1: string;
	Gears_text_2: string;
	Gears_title: string;
	id: number;
}

interface GearsListProps {
	selectedId: number | null;
	onSelect: (id: number | null) => void;
}

export default function GearsList({ selectedId, onSelect }: GearsListProps) {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	const toUrl = (p: string) => {
		if (!p) return "/assets/images/placeholder.png"; // image par défaut
		if (p.startsWith("http")) return p;
		if (!baseUrl) return p; // ou retourne une image par défaut
		return `${baseUrl}${p}`;
	};
	const { lang } = useLanguage();

	const [gears, setGears] = useState<GearsItem[]>([]);
	const [hoveredId, setHoveredId] = useState<number | null>(null);

	useEffect(() => {
		fetch(`${baseUrl}/api/gears/id-title`)
			.then((response) => response.json())
			.then((data) => {
				const gearsArray = data[lang] ?? [];
				// gearsArray contient le tableau de la langue choisie
				setGears(
					gearsArray.map((d: GearsItem) => ({
						id: d.id,
						Gears_star_1: d.Gears_star_1,
						Gears_star_2: d.Gears_star_2,
						Gears_star_3: d.Gears_star_3,
						Gears_title: d.Gears_title,
						Gears_icon: d.Gears_icon,
						Gears_icon_colored: d.Gears_icon_colored,
						Gears_icon_Mk2: d.Gears_icon_Mk2,
						Gears_icon_Mk2_colored: d.Gears_icon_Mk2_colored,
						Gears_star: d.Gears_star,
						Gears_star_colored: d.Gears_star_colored,
						Skill_1: d.Gears_skill_1,
						Skill_2: d.Gears_skill_2,
						Text_1: d.Gears_text_1,
						Text_2: d.Gears_text_2,
					})),
				);
			});
	}, [baseUrl, lang]);

	return (
		<div>
			<p className="titleSubSection_orange">
				{lang === "fr" ? "ÉQUIPEMENT" : "GEARS"} <span>&gt;</span>
			</p>
			<div className="containerList">
				<ul>
					{gears.map((item) => {
						const isFrench = lang === "fr";
						const star1 = isFrench ? item.Gears_star_1 : item.Gears_star_1;
						const star2 = isFrench ? item.Gears_star_2 : item.Gears_star_2;
						const star3 = isFrench ? item.Gears_star_3 : item.Gears_star_3;

						return (
							<li
								key={item.id}
								className="ListLi_orange gears"
								onMouseEnter={() => setHoveredId(item.id)}
								onMouseLeave={() => setHoveredId(null)}
							>
								<button
									type="button"
									className="listButton"
									onClick={() => onSelect(item.id)}
								>
									<span
										className="deco_1_orange"
										style={{
											background:
												hoveredId === item.id
													? "var(--lightblack)"
													: "var(--white)",
										}}
									/>
									<Image
										className="apparelIcon_orange"
										src={toUrl(
											hoveredId === item.id
												? item.Gears_icon_colored || item.Gears_icon_Mk2_colored
												: item.Gears_icon || item.Gears_icon_Mk2,
										)}
										alt={item.Gears_title}
										width={24}
										height={24}
									/>
									<div className="starIconsTitleContainer">
										<div className="starIconsContainer">
											<Image
												className="starIcon"
												src={toUrl(
													star1 ? item.Gears_star_colored : item.Gears_star,
												)}
												alt="Star 1"
												width={32}
												height={32}
											/>
											<Image
												className="starIcon"
												src={toUrl(
													star2 ? item.Gears_star_colored : item.Gears_star,
												)}
												alt="Star 1"
												width={32}
												height={32}
											/>
											<Image
												className="starIcon"
												src={toUrl(
													star3 ? item.Gears_star_colored : item.Gears_star,
												)}
												alt="Star 1"
												width={32}
												height={32}
											/>
										</div>
										<p className="listName">{item.Gears_title}</p>
									</div>
								</button>
								<AddFavorite objet_id={item.id} />
							</li>
						);
					})}
				</ul>
				<div className="listArrow orange">
					<Image
						src="/assets/icons/stat_2_orange.svg"
						alt="Nano suits list arrow top"
						width={300}
						height={300}
					/>
					<Image
						src="/assets/icons/stat_minus_2_orange.svg"
						alt="Nano suits list arrow bottom"
						width={300}
						height={300}
					/>
				</div>
			</div>
		</div>
	);
}
