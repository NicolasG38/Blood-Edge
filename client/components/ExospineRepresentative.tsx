import { div } from "motion/react-client";
import "./ExospineRepresentative.css";
import { useState, useEffect, use } from "react";

type ExospineItem = {
	Exospine_id: number;
	Exospine_bar_1: boolean;
	Exospine_bar_2: boolean;
	Exospine_bar_3: boolean;
	Exospine_title_fr: string;
	Exospine_title_en: string;
	Exospine_skill_1_fr: string;
	Exospine_skill_1_en: string;
	Exospine_skill_2_fr: string;
	Exospine_skill_2_en: string;
	Exospine_skill_3_fr: string;
	Exospine_skill_3_en: string;
	Exospine_text_1_fr: string;
	Exospine_text_1_en: string;
	Exospine_text_2_fr: string;
	Exospine_text_2_en: string;
	Exospine_bar: string;
};

type ExospineMap = {
	id: number;
	bar_1: boolean;
	bar_2: boolean;
	bar_3: boolean;
	title_fr: string;
	title_en: string;
	skill_1_fr: string;
	skill_1_en: string;
	skill_2_fr: string;
	skill_2_en: string;
	skill_3_fr: string;
	skill_3_en: string;
	text_1_fr: string;
	text_1_en: string;
	text_2_fr: string;
	text_2_en: string;
	bar: string;
};

interface ExospineListProps {
	selectedId: number | null;
}
export default function ExospineRepresentative({
	selectedId,
}: ExospineListProps) {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const [ExospineServer, setExospineServer] = useState<ExospineMap[]>([]);

	useEffect(() => {
		fetch(`${baseURL}/api/exospine`)
			.then((response) => response.json())
			.then((data) => {
				const normalized = (Array.isArray(data) ? data : []).map((d) => ({
					id: d.Exospine_id,
					bar_1: d.Exospine_bar_1,
					bar_2: d.Exospine_bar_2,
					bar_3: d.Exospine_bar_3,
					title_fr: d.Exospine_title_fr,
					title_en: d.Exospine_title_en,
					skill_1_fr: d.Exospine_skill_1_fr,
					skill_1_en: d.Exospine_skill_1_en,
					skill_2_fr: d.Exospine_skill_2_fr,
					skill_2_en: d.Exospine_skill_2_en,
					skill_3_fr: d.Exospine_skill_3_fr,
					skill_3_en: d.Exospine_skill_3_en,
					text_1_fr: d.Exospine_text_1_fr,
					text_1_en: d.Exospine_text_1_en,
					text_2_fr: d.Exospine_text_2_fr,
					text_2_en: d.Exospine_text_2_en,
					bar: d.Exospine_bar,
				}));
				setExospineServer(normalized);
			})
			.catch((error) => {
				console.error("Error fetching exospines:", error);
			});
	}, [baseURL]);

	const current =
		ExospineServer.find((s) => s.id === Number(selectedId)) ||
		ExospineServer[0];

	if (!current) {
		return <div>Chargement des données...</div>;
	}
	const isOn = (bar: boolean) => (bar ? "bar-on" : "bar-off");
	return (
		<div id="exospineRepresentativeContainer">
			<section className="exospineRepresentative">
				<p className="exospineRepresentativeTitle">{current.title_fr}</p>

				<section className="exospine-bar">
					<div className={isOn(current.bar_1)} />
					<div className={isOn(current.bar_2)} />
					<div className={isOn(current.bar_3)} />
				</section>

				<section className="exospineRepresentativeSkill">
					<div>
						<div className="exospineSquareRounded" />
						<p className="exospineRepresentativeSkill_1">
							{current.skill_1_fr}
						</p>
					</div>
					<div>
						<div className="exospineSquareRounded" />
						<p className="exospineRepresentativeSkill_2">
							{current.skill_2_fr}
						</p>
					</div>
					<div>
						<div className="exospineSquareRounded" />
						<p className="exospineRepresentativeSkill_3">
							{current.skill_3_fr}
						</p>
					</div>
				</section>
				<section className="exospineRepresentativeText">
					<p className="exospineRepresentativeText_1">{current.text_1_fr}</p>
					<p className="exospineRepresentativeText_2">{current.text_2_fr}</p>
				</section>
			</section>
		</div>
	);
}
