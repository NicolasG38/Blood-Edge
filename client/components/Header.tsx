import "./Header.css";

//import SignupLoginLanguageBtn from "../uiux/SignUpLoginLanguageBtn";
import Image from "next/image";

export default function Header() {
	return (
		<header className="header">
			<p className="copyright">
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
		</header>
	);
}
