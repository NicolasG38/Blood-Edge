"use client";
import "./Header.css";
import "./Modal.css";

import Login from "./Login";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import SignupLoginBtn from "../uiux/SignUpLoginBtn";
import StoresBtn from "../uiux/StoresBtn";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

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
				<Login />
			</Modal>
			<SearchBar />
		</header>
	);
}
