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

function getStrokeColor(className: string) {
	switch (className) {
		case "exospine":
			return "var(--orange)";
		case "equipment":
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
	const count = favorites.filter((f) => f.type === type).length;

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

	const total = favorites.length;
	const exospineCount = favorites.filter((f) => f.type === "exospine").length;
	const equipmentCount = favorites.filter((f) => f.type === "equipment").length;
	const nanoSuitsCount = favorites.filter((f) => f.type === "ns").length;
	const glassesCount = favorites.filter((f) => f.type === "glasses").length;
	const earringsCount = favorites.filter((f) => f.type === "earrings").length;
	const hairstyleCount = favorites.filter((f) => f.type === "hairstyle").length;
	const dronesCount = favorites.filter((f) => f.type === "drones").length;
	const nsLilyCount = favorites.filter((f) => f.type === "nsLily").length;
	const nsAdamCount = favorites.filter((f) => f.type === "nsAdam").length;

	const exospinePercent =
		total > 0 ? Math.round((exospineCount / total) * 100) : 0;
	const equipmentPercent =
		total > 0 ? Math.round((equipmentCount / total) * 100) : 0;
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
		<>
			<div id="containerFavoriteCircleSubSection">
				{/* Liste des favoris */}
				<div id="favoriteCircleSubSectionGrid">
					<div>
						<div id="favoriteCircleSubSection">
							<p id="favoriteCircleSubSectionTitle">Exospine</p>
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
							<p id="favoriteCircleSubSectionTitle">Équipement</p>
							<PercentageCircle
								percent={equipmentPercent}
								className="equipment"
								type="equipment"
								favorite={favorites[0] || ({} as Favorite)}
							/>
						</div>
					</div>
					<div>
						<div id="favoriteCircleSubSection">
							<p id="favoriteCircleSubSectionTitle">Nano-Combinaison</p>
							<PercentageCircle
								percent={nanoSuitsPercent}
								className="nanoSuits"
								type="ns"
								favorite={favorites[0] || ({} as Favorite)}
							/>
						</div>
					</div>
					<div>
						<div id="favoriteCircleSubSection">
							<p id="favoriteCircleSubSectionTitle">Lunettes</p>
							<div className="circle">
								<PercentageCircle
									percent={glassesPercent}
									className="glasses"
									type="glasses"
									favorite={favorites[0] || ({} as Favorite)}
								/>
							</div>
						</div>
					</div>
					<div>
						<div id="favoriteCircleSubSection">
							<p id="favoriteCircleSubSectionTitle">Boucles d'oreilles</p>
							<div className="circle">
								<PercentageCircle
									percent={earringsPercent}
									className="earrings"
									type="earrings"
									favorite={favorites[0] || ({} as Favorite)}
								/>
							</div>
						</div>
					</div>
					<div>
						<div id="favoriteCircleSubSection">
							<p id="favoriteCircleSubSectionTitle">Coiffure</p>
							<div className="circle hairstyle">
								<PercentageCircle
									percent={hairstylePercent}
									className="hairstyle"
									type="hairstyle"
									favorite={favorites[0] || ({} as Favorite)}
								/>
							</div>
						</div>
					</div>
					<div>
						<div id="favoriteCircleSubSection">
							<p id="favoriteCircleSubSectionTitle">Drônes</p>
							<div className="circle drones">
								<PercentageCircle
									percent={dronesPercent}
									className="drones"
									type="drones"
									favorite={favorites[0] || ({} as Favorite)}
								/>
							</div>
						</div>
					</div>
					<div>
						<div id="favoriteCircleSubSection">
							<p id="favoriteCircleSubSectionTitle">Nano-Combinaison Lily</p>
							<div className="circle nanoSuitsLily">
								<PercentageCircle
									percent={nsLilyPercent}
									className="nsLilyPercent"
									type="nsLilyPercent"
									favorite={favorites[0] || ({} as Favorite)}
								/>
							</div>
						</div>
					</div>
					<div>
						<div id="favoriteCircleSubSection">
							<p id="favoriteCircleSubSectionTitle">Nano-Combinaison Adam</p>
							<div className="circle nanoSuitsAdam">
								<PercentageCircle
									percent={nsAdamPercent}
									className="nsAdamPercent"
									type="nsAdamPercent"
									favorite={favorites[0] || ({} as Favorite)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
