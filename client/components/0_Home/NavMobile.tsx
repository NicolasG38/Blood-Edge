"use client";
import "./home.css";

import SectionBtn from "./SectionBtn";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useMenuMobile } from "../../context/MenuMobileContext";

interface NavMobileProps {
	children?: React.ReactNode;
	setOpenNavProps?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavMobile({
	children,
	setOpenNavProps,
}: NavMobileProps) {
	const { openMenu, setOpenMenu } = useMenuMobile();
	const [showSection, setShowSection] = useState(false);
	const { pseudo, isLogged } = useAuth();

	useEffect(() => {
		if (openMenu) {
			setShowSection(true);
		} else {
			// Attend la fin de la transition avant de retirer le composant
			const timer = setTimeout(() => setShowSection(false), 350); // 350ms = durée de la transition CSS
			return () => clearTimeout(timer);
		}
	}, [openMenu]);

	useEffect(() => {
		// À chaque changement de page, si le menu est ouvert, on force l'affichage
		if (openMenu) {
			setShowSection(true);
		}
	}, [openMenu]);

	return (
		<nav id="nav-mobile" className={openMenu ? "open" : ""}>
			<ul>
				<li>
					<Image
						src="/assets/icons/mobile/store.svg"
						alt="Boutique"
						width={24}
						height={24}
					/>{" "}
					Boutique
				</li>
				<li>
					<Image
						src="/assets/icons/mobile/languages.svg"
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
						onClick={() => {
							setOpenMenu(!openMenu);
						}}
					>
						<Image
							src={
								openMenu
									? "/assets/icons/mobile/down.svg"
									: "/assets/icons/mobile/up.svg"
							}
							alt="Menu"
							width={60}
							height={60}
						/>
					</button>
				</li>
				<li>
					<Link href={isLogged ? `/dashboard/${pseudo}` : "/signupandlogin"}>
						<button
							type="button"
							id="login-mobile-account"
							onClick={() => setOpenMenu(false)}
						>
							<Image
								src="/assets/icons/mobile/account.svg"
								alt="Compte"
								width={24}
								height={24}
							/>{" "}
							<p>{isLogged ? "Dashboard" : "Compte"}</p>
						</button>
					</Link>
				</li>
				<li>
					<Image
						src="/assets/icons/mobile/search.svg"
						alt="Recherche"
						width={24}
						height={24}
					/>{" "}
					Recherche
				</li>
			</ul>
			{showSection && (
				<SectionBtn
					className="section-btn-mobile"
					setOpenNavProps={setOpenNavProps}
				>
					{children}
				</SectionBtn>
			)}
		</nav>
	);
}
