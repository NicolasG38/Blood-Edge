"use client";
import "./home.css";
import SectionBtn from "./SectionBtn";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function NavMobile() {
	const [open, setOpen] = useState(false);
	const [showSection, setShowSection] = useState(false);

	useEffect(() => {
		if (open) {
			setShowSection(true);
		} else {
			// Attend la fin de la transition avant de retirer le composant
			const timer = setTimeout(() => setShowSection(false), 350); // 350ms = durée de la transition CSS
			return () => clearTimeout(timer);
		}
	}, [open]);

	return (
		<nav id="nav-mobile" className={open ? "open" : ""}>
			<ul>
				<li>
					<Image
						src="assets/icons/mobile/store.svg"
						alt="Boutique"
						width={24}
						height={24}
					/>{" "}
					Boutique
				</li>
				<li>
					<Image
						src="assets/icons/mobile/languages.svg"
						alt="Langues"
						width={24}
						height={24}
					/>
					Langues
				</li>
				<li id="menu-mobile">
					<button
						type="button"
						id="menu-mobile-btn"
						onClick={() => setOpen((v) => !v)}
					>
						<Image
							src={
								open
									? "assets/icons/mobile/down.svg"
									: "assets/icons/mobile/up.svg"
							}
							alt="Menu"
							width={60}
							height={60}
						/>
					</button>
				</li>
				<li>
					<Image
						src="assets/icons/mobile/account.svg"
						alt="Compte"
						width={24}
						height={24}
					/>{" "}
					Compte
				</li>
				<li>
					<Image
						src="assets/icons/mobile/search.svg"
						alt="Recherche"
						width={24}
						height={24}
					/>{" "}
					Recherche
				</li>
			</ul>
			{showSection && <SectionBtn className="section-btn-mobile" />}
		</nav>
	);
}
