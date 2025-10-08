"use client";
import "../Representative.css";
import { useLanguage } from "../../../context/LangContext";
import { useState, useEffect } from "react";
import Image from "next/image";

type GearsItem = {
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
	Gears_stat_1: number;
	Gears_stat_2: number;
	Gears_text_1: string;
	Gears_text_2: string;
	Gears_title: string;
	id: number;
};
interface GearsListProps {
	selectedId: number | null;
}
export default function EquipementRepresentative({
	selectedId,
}: GearsListProps) {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const toUrl = (p: string) => {
		if (!p) return "/assets/images/placeholder.png"; // image par défaut
		if (p.startsWith("http")) return p;
		if (!baseURL) return p; // ou retourne une image par défaut
		return `${baseURL}${p}`;
	};
	const { lang } = useLanguage();
	const [GearsServer, setGearsServer] = useState<GearsItem[]>([]);

	useEffect(() => {
		fetch(`${baseURL}/api/gears`)
			.then((response) => response.json())
			.then((data) => {
				const gearsArray = data[lang] ?? [];

				setGearsServer(
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
						Gears_stat_1: d.Gears_stat_1,
						Gears_stat_2: d.Gears_stat_2,
						Gears_skill_1: d.Gears_skill_1,
						Gears_skill_2: d.Gears_skill_2,
						Gears_text_1: d.Gears_text_1,
						Gears_text_2: d.Gears_text_2,
					})),
				);
			})
			.catch((error) => {
				console.error("Error fetching gears:", error);
			});
	}, [baseURL, lang]);
	console.log(GearsServer);
	const current =
		GearsServer.find((s) => s.id === Number(selectedId)) || GearsServer[0];

	if (!current) {
		return <div>Chargement des données...</div>;
	}

	return (
		<div className="containerRepresentative">
			<section className="representative">
				<div className="stars">
					<Image
						src={toUrl(
							current.Gears_star_1
								? current.Gears_star_colored
								: current.Gears_star,
						)}
						alt="Star 1"
						className="star-icon"
						width={32}
						height={32}
					/>
					<Image
						src={toUrl(
							current.Gears_star_2
								? current.Gears_star_colored
								: current.Gears_star,
						)}
						alt="Star 2"
						className="star-icon"
						width={32}
						height={32}
					/>
					<Image
						src={toUrl(
							current.Gears_star_3
								? current.Gears_star_colored
								: current.Gears_star,
						)}
						alt="Star 3"
						className="star-icon"
						width={32}
						height={32}
					/>
				</div>
				<p className="representativeTitle">{current.Gears_title}</p>
				<section className="representativeSkill gears">
					<p className="gearsRepresentativeSkilltext">
						{current.Gears_skill_1}{" "}
						<span className="gearsRepresentativeSkillValue">
							+{current.Gears_stat_1}%
						</span>
					</p>
					{current.Gears_skill_2 && current.Gears_stat_2 !== null && (
						<p className="gearsRepresentativeSkilltext">
							{current.Gears_skill_2}{" "}
							<span className="gearsRepresentativeSkillValue">
								+{current.Gears_stat_2}%
							</span>
						</p>
					)}
				</section>

				<div className="representativeText">
					<p className="representativeText_1">{current.Gears_text_1}</p>
					<p className="representativeText_2">{current.Gears_text_2}</p>
				</div>
			</section>
		</div>
	);
}
