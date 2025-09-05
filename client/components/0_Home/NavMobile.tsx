"use client";
import "./home.css";

import SectionBtn from "./SectionBtn";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import Image from "next/image";

interface NavMobileProps {
	children?: React.ReactNode;
	setOpenNavProps?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavMobile({
	children,
	setOpenNavProps,
}: NavMobileProps) {
	const [openNav, setOpenNav] = useState(false);
	const [showSection, setShowSection] = useState(false);
	const { userId, pseudo, isLogged, setAuth } = useAuth();

	useEffect(() => {
		if (openNav) {
			setShowSection(true);
		} else {
			// Attend la fin de la transition avant de retirer le composant
			const timer = setTimeout(() => setShowSection(false), 350); // 350ms = durée de la transition CSS
			return () => clearTimeout(timer);
		}
	}, [openNav]);

	return (
		<>
			<nav id="nav-mobile" className={openNav ? "open" : ""}>
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
							onClick={() => setOpenNav((v) => !v)}
						>
							<Image
								src={
									openNav
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
						<Link href={isLogged ? `/dashboard/${pseudo}` : "/signupandlogin"}>
							<button
								type="button"
								id="login-mobile-account"
								onClick={() => setOpenNav(false)}
							>
								<Image
									src="assets/icons/mobile/account.svg"
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
							src="assets/icons/mobile/search.svg"
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
						setOpenNavProps={setOpenNav}
					>
						{children}
					</SectionBtn>
				)}
			</nav>
		</>
	);
}
