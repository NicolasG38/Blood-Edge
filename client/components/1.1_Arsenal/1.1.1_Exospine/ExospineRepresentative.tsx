"use client";
import "../Representative.css";
import { useState, useEffect } from "react";

type ExospineMap = {
	id: number;
	bar_1: boolean;
	bar_2: boolean;
	bar_3: boolean;
	Exospine_bar_1: boolean;
	Exospine_bar_2: boolean;
	Exospine_bar_3: boolean;
	title: string;
	skill_1: string;
	skill_2: string;
	skill_3: string;
	Skill_1: string;
	Skill_2: string;
	Skill_3: string;
	text_1: string;
	text_2: string;
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
				const normalized = data.map((d: ExospineMap) => ({
					id: d.id,
					title: d.title,
					bar_1: d.Exospine_bar_1,
					bar_2: d.Exospine_bar_2,
					bar_3: d.Exospine_bar_3,
					skill_1: d.Skill_1,
					skill_2: d.Skill_2,
					skill_3: d.Skill_3,
					text_1: d.text_1,
					text_2: d.text_2,
					// ...autres champs
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
		<div className="containerRepresentative">
			<section className="representative">
				<p className="representativeTitle">{current.title}</p>

				<section className="exospine-bar">
					<div className={isOn(current.bar_1)} />
					<div className={isOn(current.bar_2)} />
					<div className={isOn(current.bar_3)} />
				</section>

				<section className="representativeSkill">
					<div>
						<div className="exospineSquareRounded" />
						<p className="exospineRepresentativeSkill_1">{current.skill_1}</p>
					</div>
					<div>
						<div className="exospineSquareRounded" />
						<p className="exospineRepresentativeSkill_2">{current.skill_2}</p>
					</div>
					<div>
						<div className="exospineSquareRounded" />
						<p className="exospineRepresentativeSkill_3">{current.skill_3}</p>
					</div>
				</section>
				<section className="representativeText">
					<p className="representativeText_1">{current.text_1}</p>
					<p className="representativeText_2">{current.text_2}</p>
				</section>
			</section>
		</div>
	);
}
