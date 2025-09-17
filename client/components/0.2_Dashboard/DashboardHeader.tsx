import "./DashboardPage.css";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import Image from "next/image";

interface NanoSuit {
	NS_id: number;
	NS_title: string;
	image: string;
	name: string;
}

interface User {
	User_id: number;
	User_pseudo: string;
	User_email: string;
	User_timestamp: string;
	inscriptionDuration: string;
}

export default function DashboardHeader() {
	const params = useParams();

	const pseudo = typeof params === "object" ? params.pseudo : params;
	const [user, setUser] = useState<User | null>(null);
	const { isLogged } = useAuth();
	const [nanoSuits, setNanoSuits] = useState<NanoSuit[]>([]);
	const [hoveredId, setHoveredId] = useState<number | null>(null);
	const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3310";

	useEffect(() => {
		if (!pseudo) return;
		fetch(`${baseURL}/api/users/${pseudo}`)
			.then((response) => response.json())
			.then(setUser);
	}, [baseURL, pseudo]);

	return (
		<div id="dashboardHeader">
			<h1 id="dashboardTitle">Hello, {user?.User_pseudo} </h1>
			<div id="containerInfos">
				<p id="dashboardEmail">{user?.User_email}</p>
				<p id="dashboardMembershipDate">
					Membre depuis : {user?.inscriptionDuration}
				</p>
				<div id="containerFavorites">
					<h2 id="favoritesTitle">Vos favoris</h2>
				</div>
			</div>
		</div>
	);
}
