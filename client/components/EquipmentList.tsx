"use client";
import "./EquipmentList.css";
import AddFavorite from "../uiux/AddFavorite";
import Image from "next/image";
import { useEffect, useState } from "react";

interface GearsItem {
	Equipment_id: number;
	Equipment_star_1: boolean;
	Equipment_star_2: boolean;
	Equipment_star_3: boolean;
	Equipment_title_fr: string;
	Equipment_title_en: string;
	Equipment_star: string;
	Equipment_star_fill: string;
	Equipment_icon: string;
	Equipment_icon_colored: string;
	Equipment_icon_Mk2: string;
	Equipment_icon_Mk2_colored: string;
}

interface GearsListProps {
	selectedId: number | null;
	onSelect: (id: number | null) => void;
}

export default function GearsList({ selectedId, onSelect }: GearsListProps) {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	const toUrl = (p: string) => (p?.startsWith("http") ? p : `${baseUrl}${p}`);

	const [gears, setGears] = useState<GearsItem[]>([]);
	const [hoveredId, setHoveredId] = useState<number | null>(null);

	useEffect(() => {
		fetch(`${baseUrl}/api/equipment/id-title`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setGears(data);
			});
	}, [baseUrl]);

	return (
		<div className="gears-list">
			<p className="titleSubSection_2">
				GEARS <span>&gt;</span>
			</p>
			<div id="containerListGears">
				<ul id="gearsListUl">
					{gears.map((item) => (
						<li
							key={item.Equipment_id}
							className="gearsListLi"
							onMouseEnter={() => setHoveredId(item.Equipment_id)}
							onMouseLeave={() => setHoveredId(null)}
						>
							<button
								type="button"
								className="gearsButton"
								onClick={() => onSelect(item.Equipment_id)}
							>
								<span
									className="gearsDeco_1"
									style={{
										background:
											hoveredId === item.Equipment_id
												? "var(--lightblack)"
												: "var(--white)",
									}}
								/>
								<Image
									className="apparelIcon"
									src={toUrl(
										hoveredId === item.Equipment_id
											? item.Equipment_icon_colored ||
													item.Equipment_icon_Mk2_colored
											: item.Equipment_icon || item.Equipment_icon_Mk2,
									)}
									alt={item.Equipment_title_fr}
									width={24}
									height={24}
								/>
								<p className="gearsName">{item.Equipment_title_fr}</p>
							</button>
							<AddFavorite equip={item.Equipment_id.toString()} />
						</li>
					))}
				</ul>
				<div id="gearsListArrow">
					<Image
						id="gearsListArrowTop"
						src="/assets/icons/stat_2_orange.svg"
						alt="Nano suits list arrow top"
						width={300}
						height={300}
					/>

					<Image
						id="gearsListArrowBottom"
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
