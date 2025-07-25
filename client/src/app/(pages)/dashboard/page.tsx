"use client";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import "./DashboardPage.css";
import { useState, useEffect } from "react";

export default function DashboardPage() {
	const [pseudo, setPseudo] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedPseudo = localStorage.getItem("pseudoStorage");
			if (storedPseudo) setPseudo(storedPseudo);
		}
	}, []);

	return (
		<>
			<Header />
			<main>
				<h1 id="dashboardTitle">Hello, {pseudo}</h1>
				<p id="favoritesTitle">Vos favoris</p>
			</main>
			<Footer />
		</>
	);
}
