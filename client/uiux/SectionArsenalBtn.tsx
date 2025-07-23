"use client";
import "./SectionArsenalBtn.css";
import Image from "next/image";
import { useState } from "react";

export default function SectionArsenalBtn() {
	const [hovered, setHovered] = useState(false);

	return (
		<section id="containerSectionArsenal">
			<div
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				id="sectionArsenal"
			>
				<div id="arsenaldeco">
					<span id="arsenaldeco_1" />
					<span id="arsenaldeco_2" />
				</div>
				{/*<div id="arsenalborder">*/}
				<div id="btnArsenal">
					<p
						style={{
							color: hovered ? "var(--white)" : "var(--black)",
						}}
					>
						Arsenal
					</p>
				</div>
				{/*</div>*/}
				<Image
					id="arsenalIcon"
					src={
						hovered
							? "/assets/icons/manufacturing_black.svg"
							: "/assets/icons/manufacturing.svg"
					}
					alt="Arsenal Icon"
					width={96}
					height={96}
				/>
			</div>
		</section>
	);
}
