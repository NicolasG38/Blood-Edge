import "./FavoriteCircle.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Favorite {
	Favorite_id: number;
	Favorite_users_id: number;
	Favorite_objet_id_fk: number;
	Objet_id: number;
	Objet_arsenal_id_fk: number;
	Objet_type_id_fk: number;
	TypeObjet_name: string;
	Arsenal_title: string;
}

export default function FavoriteCircle() {
	const params = useParams();
	const pseudo = typeof params === "object" ? params.pseudo : params;
	const [favorites, setFavorites] = useState<Favorite[]>([]);
	const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3310";

	useEffect(() => {
		if (!pseudo) return;
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

	return (
		<div id="containerFavoriteCircle">
			<div id="favoriteCircle">
				<p id="favoriteCircleTitle">TOTAL</p>
				<div id="circle">
					<p>{favorites.length}</p>
				</div>
			</div>
		</div>
	);
}
