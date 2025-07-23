import "./Header.css";
import Link from "next/link";
import SignupLoginBtn from "../uiux/SignUpLoginBtn";
import Image from "next/image";

export default function Header() {
	return (
		<header id="header">
			<p id="copyrightHeader">
				STELLAR BLADE© 2024 SHIFT UP Corporation. All right reserved. Published
				by Sony Interactive Entertainment
			</p>
			<Link href="/">
				<Image
					id="logo"
					src="/assets/logo/Blood-Edge_V1.webp"
					alt="Logo"
					width={188}
					height={150}
				/>
			</Link>
			<Link href="/signup&login">
				<SignupLoginBtn />
			</Link>
		</header>
	);
}
