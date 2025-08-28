import "./EquipementRepresentative.css";
import { useState, useEffect } from "react";
import Image from "next/image";

type GearsMap = {
	Equipement_id: number;
	Equipement_star_1: boolean;
	Equipement_star_2: boolean;
	Equipement_star_3: boolean;
	Equipement_title_fr: string;
	Equipement_title_en: string;
	Equipement_skill_1_fr: string;
	Equipement_skill_1_en: string;
	Equipement_skill_2_fr: string;
	Equipement_skill_2_en: string;
	Equipement_stat_1: number;
	Equipement_stat_2?: number;
	Equipement_text_1_fr: string;
	Equipement_text_1_en: string;
	Equipement_text_2_fr: string;
	Equipement_text_2_en: string;
	Equipement_star: string;
	Equipement_star_fill: string;
};

type GearsUI = {
	id: number;
	star_1: boolean;
	star_2: boolean;
	star_3: boolean;
	title_fr: string;
	title_en: string;
	skill_1_fr: string;
	skill_1_en: string;
	skill_2_fr: string;
	skill_2_en: string;
	stat_1: number;
	stat_2: number;
	text_1_fr: string;
	text_1_en: string;
	text_2_fr: string;
	text_2_en: string;
	star: string;
	star_fill: string;
};
interface GearsListProps {
	selectedId: number | null;
}
export default function EquipementRepresentative({
	selectedId,
}: GearsListProps) {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const toUrl = (p: string) => (p?.startsWith("http") ? p : `${baseURL}${p}`);
	const [GearsServer, setGearsServer] = useState<GearsUI[]>([]);

	useEffect(() => {
		fetch(`${baseURL}/api/equipment`)
			.then((response) => response.json())
			.then((data) => {
				console.log("Réponse brute :", data); // ← Ajoute ce log
				const normalized = (Array.isArray(data) ? data : []).map((d) => ({
					id: d.Equipment_id,
					star_1: Boolean(Number(d.Equipment_star_1)),
					star_2: Boolean(Number(d.Equipment_star_2)),
					star_3: Boolean(Number(d.Equipment_star_3)),
					title_fr: d.Equipment_title_fr,
					title_en: d.Equipment_title_en,
					skill_1_fr: d.Equipment_skill_1_fr,
					skill_1_en: d.Equipment_skill_1_en,
					skill_2_fr: d.Equipment_skill_2_fr,
					skill_2_en: d.Equipment_skill_2_en,
					stat_1: Number(d.Equipment_stat_1),
					stat_2: Number(d.Equipment_stat_2),
					text_1_fr: d.Equipment_text_1_fr,
					text_1_en: d.Equipment_text_1_en,
					text_2_fr: d.Equipment_text_2_fr,
					text_2_en: d.Equipment_text_2_en,
					star: d.Equipment_star,
					star_fill: d.Equipment_star_fill,
				}));
				setGearsServer(normalized);
			})
			.catch((error) => {
				console.error("Error fetching gears:", error);
			});
	}, [baseURL]);

	const current =
		GearsServer.find((s) => s.id === Number(selectedId)) || GearsServer[0];

	if (!current) {
		return <div>Chargement des données...</div>;
	}
	console.log("GearsServer:", GearsServer);
	return (
		<div className="gearsRepresentative">
			<div className="stars">
				<Image
					src={toUrl(current.star_1 ? current.star_fill : current.star)}
					alt="Star 1"
					className="star-icon"
					width={32}
					height={32}
				/>
				<Image
					src={toUrl(current.star_2 ? current.star_fill : current.star)}
					alt="Star 2"
					className="star-icon"
					width={32}
					height={32}
				/>
				<Image
					src={toUrl(current.star_3 ? current.star_fill : current.star)}
					alt="Star 3"
					className="star-icon"
					width={32}
					height={32}
				/>
			</div>
			<p className="gearsRepresentativeTitle">{current.title_en}</p>
			<section className="gearsRepresentativeSkill">
				<p>
					{current.skill_1_fr}{" "}
					<span className="gearsRepresentativeSkillValue">
						+{current.stat_1}%
					</span>
				</p>
				<p>
					{current.skill_2_fr}{" "}
					<span className="gearsRepresentativeSkillValue">
						+{current.stat_2}%
					</span>
				</p>
			</section>

			<div className="gearsRepresentativeText">
				<p className="gearsRepresentativeText_1">{current.text_1_fr}</p>
				<p className="gearsRepresentativeText_2">{current.text_2_fr}</p>
			</div>
		</div>
	);
}
