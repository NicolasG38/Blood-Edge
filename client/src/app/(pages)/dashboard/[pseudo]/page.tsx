"use client";
import Footer from "../../../../../components/0_Home/Footer";
import Logout from "../../../../../uiux/Logout";
import Header from "../../../../../components/0_Home/Header";
import "../DashboardPage.css";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
}

export default function DashboardPage() {
	const params = useParams();
	const pseudo = typeof params === "object" ? params.pseudo : params;
	const [user, setUser] = useState<User | null>(null);

	const [hoveredId, setHoveredId] = useState<number | null>(null);
	const [nanoSuits, setNanoSuits] = useState<NanoSuit[]>([]);
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		if (!pseudo) return;
		fetch(`${baseURL}/api/users/${pseudo}`)
			.then((response) => response.json())
			.then(setUser);
	}, [pseudo, baseURL]);

	console.log("pseudo:", user);

	useEffect(() => {
		fetch(`${baseURL}/api/nanosuits`)
			.then((response) => response.json())
			.then((data) => {
				setNanoSuits(data);
			});
	}, [baseURL]);

	return (
		<>
			<Header />
			<main>
				<Logout />
				<h1 id="dashboardTitle">Hello, {user?.User_pseudo} </h1>
				<div>
					<p>Pseudo : {user?.User_pseudo}</p>
					<p>Email : {user?.User_email}</p>
					{/* autres infos */}
				</div>
				<p id="favoritesTitle">Vos favoris</p>
				<div id="favoritesList">
					{" "}
					<div id="containerListNanoSuits">
						<ul id="nanoSuitsListUl">
							{nanoSuits.map((suit) => (
								<li
									key={suit.NS_id}
									className="nanoSuitlistLi"
									onMouseEnter={() => setHoveredId(suit.NS_id)}
									onMouseLeave={() => setHoveredId(null)}
								>
									<span
										className="nanoSuitDeco_1"
										style={{
											background:
												hoveredId === suit.NS_id
													? "var(--lightdenim)"
													: "var(--white)",
										}}
									/>
									<Image
										className="apparelIcon"
										src={
											hoveredId === suit.NS_id
												? "/assets/icons/apparel_black.svg"
												: "/assets/icons/apparel.svg"
										}
										alt="Arsenal Icon"
										width={70}
										height={70}
									/>
									<p className="nanoSuitName">{suit.name}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
