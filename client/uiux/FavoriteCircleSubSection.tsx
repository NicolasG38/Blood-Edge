import "./FavoriteCircleSubSection.css";
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

function getTypeFromId(typeId: number) {
	switch (typeId) {
		case 1:
			return "exospine";
		case 2:
			return "gears";
		case 3:
			return "nanoSuits";
		case 4:
			return "glasses";
		case 5:
			return "earrings";
		case 6:
			return "hairstyle";
		case 7:
			return "drones";
		case 8:
			return "nsLily";
		case 9:
			return "nsAdam";
		default:
			return "other";
	}
}

function getStrokeColor(className: string) {
	switch (className) {
		case "exospine":
			return "var(--orange)";
		case "gears":
			return "var(--orange)";
		case "nanoSuits":
			return "var(--denim)";
		case "glasses":
			return "var(--brown)";
		case "earrings":
			return "var(--brown)";
		case "hairstyle":
			return "var(--brown)";
		case "drones":
			return "var(--denim)";
		case "nsLily":
			return "var(--denim)";
		case "nsAdam":
			return "var(--denim)";
		default:
			return "#888";
	}
}

function PercentageCircle({
	percent,
	className,
	type,
}: { percent: number; className: string; type: string; favorite: Favorite }) {
	const radius = 50;
	const stroke = 4;
	const normalizedRadius = radius - stroke / 2;
	const circumference = normalizedRadius * 2 * Math.PI;
	const strokeDashoffset = circumference - (percent / 100) * circumference;

	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const params = useParams();
	const pseudo = typeof params === "object" ? params.pseudo : params;
	const [favorites, setFavorites] = useState<Favorite[]>([]);
	const count = favorites.filter(
		(f) => getTypeFromId(f.Objet_type_id_fk) === type,
	).length;

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

	return (
		<div className={`circle ${className}`}>
			<svg height={100} width={100} aria-label="Progress Circle">
				<title>Cercle quantité</title>
				<circle
					stroke="#eee"
					fill="transparent"
					strokeWidth={stroke}
					r={normalizedRadius}
					cx={50}
					cy={50}
				/>
				<circle
					stroke={getStrokeColor(className)}
					fill="transparent"
					strokeWidth={stroke}
					strokeDasharray={`${circumference} ${circumference}`}
					style={{
						strokeDashoffset,
						transition: "stroke-dashoffset 0.5s",
					}}
					r={normalizedRadius}
					cx={50}
					cy={50}
					transform="rotate(-90 50 50)"
				/>
			</svg>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "2rem",
					fontWeight: "bold",
				}}
			>
				<p>{count}</p>
			</div>
		</div>
	);
}

export default function FavoriteCircleSubSection() {
	const params = useParams();
	const pseudo = typeof params === "object" ? params.pseudo : params;
	const [favorites, setFavorites] = useState<Favorite[]>([]);
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

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

	const total = favorites.length;
	const exospineCount = favorites.filter(
		(f) => getTypeFromId(f.Objet_type_id_fk) === "exospine",
	).length;
	const gearsCount = favorites.filter(
		(f) => getTypeFromId(f.Objet_type_id_fk) === "gears",
	).length;
	const nanoSuitsCount = favorites.filter(
		(f) => getTypeFromId(f.Objet_type_id_fk) === "nanoSuits",
	).length;
	const glassesCount = favorites.filter(
		(f) => getTypeFromId(f.Objet_type_id_fk) === "glasses",
	).length;
	const earringsCount = favorites.filter(
		(f) => getTypeFromId(f.Objet_type_id_fk) === "earrings",
	).length;
	const hairstyleCount = favorites.filter(
		(f) => getTypeFromId(f.Objet_type_id_fk) === "hairstyle",
	).length;
	const dronesCount = favorites.filter(
		(f) => getTypeFromId(f.Objet_type_id_fk) === "drones",
	).length;
	const nsLilyCount = favorites.filter(
		(f) => getTypeFromId(f.Objet_type_id_fk) === "nsLily",
	).length;
	const nsAdamCount = favorites.filter(
		(f) => getTypeFromId(f.Objet_type_id_fk) === "nsAdam",
	).length;

	const exospinePercent =
		total > 0 ? Math.round((exospineCount / total) * 100) : 0;
	const gearsPercent = total > 0 ? Math.round((gearsCount / total) * 100) : 0;
	const nanoSuitsPercent =
		total > 0 ? Math.round((nanoSuitsCount / total) * 100) : 0;
	const glassesPercent =
		total > 0 ? Math.round((glassesCount / total) * 100) : 0;
	const earringsPercent =
		total > 0 ? Math.round((earringsCount / total) * 100) : 0;
	const hairstylePercent =
		total > 0 ? Math.round((hairstyleCount / total) * 100) : 0;
	const dronesPercent = total > 0 ? Math.round((dronesCount / total) * 100) : 0;
	const nsLilyPercent = total > 0 ? Math.round((nsLilyCount / total) * 100) : 0;
	const nsAdamPercent = total > 0 ? Math.round((nsAdamCount / total) * 100) : 0;

	return (
		<div id="containerFavoriteCircleSubSection">
			<div id="favoriteCircleSubSectionGrid">
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle">Exospines</p>
						<div className="circle">
							<PercentageCircle
								percent={exospinePercent}
								className="exospine"
								type="exospine"
								favorite={favorites[0] || ({} as Favorite)}
							/>
						</div>
					</div>
				</div>
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle">Équipements</p>
						<PercentageCircle
							percent={gearsPercent}
							className="gears"
							type="gears"
							favorite={favorites[0] || ({} as Favorite)}
						/>
					</div>
				</div>
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle">Nano-Combinaisons</p>
						<PercentageCircle
							percent={nanoSuitsPercent}
							className="nanoSuits"
							type="nanoSuits"
							favorite={favorites[0] || ({} as Favorite)}
						/>
					</div>
				</div>
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle">Lunettes</p>
						<PercentageCircle
							percent={glassesPercent}
							className="glasses"
							type="glasses"
							favorite={favorites[0] || ({} as Favorite)}
						/>
					</div>
				</div>
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle">Boucles d'oreilles</p>
						<PercentageCircle
							percent={earringsPercent}
							className="earrings"
							type="earrings"
							favorite={favorites[0] || ({} as Favorite)}
						/>
					</div>
				</div>
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle">Coiffures</p>
						<PercentageCircle
							percent={hairstylePercent}
							className="hairstyle"
							type="hairstyle"
							favorite={favorites[0] || ({} as Favorite)}
						/>
					</div>
				</div>
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle">Drones</p>
						<PercentageCircle
							percent={dronesPercent}
							className="drones"
							type="drones"
							favorite={favorites[0] || ({} as Favorite)}
						/>
					</div>
				</div>
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle">Nano-Combinaisons Lily</p>
						<PercentageCircle
							percent={nsLilyPercent}
							className="nsLily"
							type="nsLily"
							favorite={favorites[0] || ({} as Favorite)}
						/>
					</div>
				</div>
				<div>
					<div id="favoriteCircleSubSection">
						<p id="favoriteCircleSubSectionTitle">Nano-Combinaisons Adam</p>
						<PercentageCircle
							percent={nsAdamPercent}
							className="nsAdam"
							type="nsAdam"
							favorite={favorites[0] || ({} as Favorite)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
