"use client";
import "./home.css";
import { useState } from "react";
import Image from "next/image";

export default function NavMobile() {
	const [open, setOpen] = useState(false);

	return (
		<nav className="nav-mobile">
			<ul className={open ? "open" : ""}>
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
		</nav>
	);
}
