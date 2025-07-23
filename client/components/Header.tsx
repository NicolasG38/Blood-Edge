import "./Header.css";

import SignupLoginBtn from "../uiux/SignUpLoginBtn";
import Image from "next/image";

export default function Header() {
	return (
		<header id="header">
			<p id="copyrightHeader">
				STELLAR BLADE© 2024 SHIFT UP Corporation. All right reserved. Published
				by Sony Interactive Entertainment
			</p>
			<Image
				id="logo"
				src="/assets/logo/Blood-Edge_V1.webp"
				alt="Logo"
				width={188}
				height={150}
			/>
			<SignupLoginBtn />
		</header>
	);
}
