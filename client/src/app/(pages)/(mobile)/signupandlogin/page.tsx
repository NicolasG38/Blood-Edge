"use client";
import Footer from "../../../../../components/0_Home/Footer";
import Header from "../../../../../components/0_Home/Header";
import Login from "../../../../../components/0.1_Auth/Login";
import NavMobile from "../../../../../components/0_Home/NavMobile";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpAndLoginPage() {
	const router = useRouter();

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				router.replace("/");
			}
		};
		// Vérifie au chargement
		handleResize();
		// Surveille le resize
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [router]);
	return (
		<>
			<Header />
			<Login />
			<NavMobile />
			<Footer />
		</>
	);
}
