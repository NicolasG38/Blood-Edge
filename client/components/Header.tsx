"use client";
import "./Header.css";
import "./Modal.css";
import Link from "next/link";
import SignupLoginBtn from "../uiux/SignUpLoginBtn";
import Image from "next/image";
import StoresBtn from "../uiux/StoresBtn";
import Modal from "./Modal";
import { useState } from "react";
import LoginWrapper from "./LoginWrapper";

export default function Header() {
	const [openAuth, setOpenAuth] = useState(false);

	return (
		<header id="header">
			<p id="copyrightHeader">
				STELLAR BLADE© 2024 SHIFT UP Corporation. All right reserved. Published
				by Sony Interactive Entertainment
			</p>
			<StoresBtn />
			<Link href="/">
				<Image
					id="logo"
					src="/assets/logo/Blood-Edge_V1.webp"
					alt="Logo"
					width={188}
					height={150}
				/>
			</Link>
			<SignupLoginBtn
				onLoginClick={() => setOpenAuth(true)}
				onSignupClick={() => setOpenAuth(true)}
			/>

			<Modal open={openAuth} onClose={() => setOpenAuth(false)}>
				<LoginWrapper
					initialView="login"
					delayMs={4000}
					onAuthenticated={() => {
						/* ici tu peux déclencher un refresh ou charger des données */
					}}
					onClose={() => setOpenAuth(false)}
				/>
			</Modal>
		</header>
	);
}
