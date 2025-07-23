"use client";
import "./ArsenalNanoSuits.css";
import Image from "next/image";
import { useState } from "react";

export default function SectionArsenalBtn() {
	const [hovered, setHovered] = useState(false);

	return (
		<section id="containerSectionArsenal">
			<div
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				id="sectionNanoSuits"
			>
				<div id="nanoSuitsdeco">
					<span
						id="nanoSuitsdeco_0"
						style={{
							background: hovered ? "var(--white)" : "var(--lightdenim)",
						}}
					/>
					<span id="nanoSuitsdeco_1" />
					<span id="nanoSuitsdeco_2" />
				</div>
				<Image
					id="nanoSuitsIcon"
					src={
						hovered
							? "/assets/icons/apparel.svg"
							: "/assets/icons/apparel_black.svg"
					}
					alt="Arsenal Icon"
					width={24}
					height={24}
				/>
				<div id="btnNanoSuits">
					<p
						style={{
							color: hovered ? "var(--white)" : "var(--black)",
						}}
					>
						Nano-combinaison
					</p>
				</div>
			</div>
		</section>
	);
}
