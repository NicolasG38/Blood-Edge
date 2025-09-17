import "./FavoriteCircleSubSection.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Favorite {
	Favorite_id: number;
	Favorite_user_id: number;
	User_id: number;
	id: number;
	target_id: number;
	type: string;
}
export default function FavoriteCircleSubSection() {
	const params = useParams();
	const pseudo = typeof params === "object" ? params.pseudo : params;
	const [favorites, setFavorites] = useState<Favorite[]>([]);
	const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3310";

	useEffect(() => {
		fetch(`${baseURL}/api/favorites/${pseudo}`)
			.then((response) => response.json())
			.then((data) => {
				if (Array.isArray(data)) {
					setFavorites(data);
				} else {
					setFavorites([]);
				}
			});
	}, [baseURL, pseudo]);
	console.log(favorites);
	return (
		<div id="containerFavoriteCircleSubSection">
			{/* Liste des favoris */}
			<div id="favoriteCircleSubSectionGrid">
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle ">Exospine</p>
						<div className="circle exospine">
							<p>{favorites.filter((f) => f.type === "exospine").length}</p>
						</div>
					</div>
				</div>
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle ">Équipement</p>
						<div className="circle gears">
							<p>{favorites.filter((f) => f.type === "equipment").length}</p>
						</div>
					</div>
				</div>
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle ">Nano-Combinaison</p>
						<div className="circle nanoSuits">
							<p>{favorites.filter((f) => f.type === "ns").length}</p>
						</div>
					</div>
				</div>

				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle">Lunettes</p>
						<div className="circle glasses">
							<p>{favorites.filter((f) => f.type === "glasses").length}</p>
						</div>
					</div>
				</div>
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle">Boucles d'oreilles</p>
						<div className="circle earrings">
							<p>{favorites.filter((f) => f.type === "earrings").length}</p>
						</div>
					</div>
				</div>
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle">coiffure</p>
						<div className="circle hairstyle">
							<p>{favorites.filter((f) => f.type === "hairstyle").length}</p>
						</div>
					</div>
				</div>
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle">Drônes</p>
						<div className="circle drones">
							<p>{favorites.filter((f) => f.type === "drones").length}</p>
						</div>
					</div>
				</div>
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle">Nano-Combinaison Lily</p>
						<div className="circle nanoSuitsLily">
							<p>{favorites.filter((f) => f.type === "nsLily").length}</p>
						</div>
					</div>
				</div>
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle">Nano-Combinaison Adam</p>
						<div className="circle nanoSuitsAdam">
							<p>{favorites.filter((f) => f.type === "nsAdam").length}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
