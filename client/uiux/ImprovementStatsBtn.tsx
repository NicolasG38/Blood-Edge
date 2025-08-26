import "./ImprovementStatsBtn.css";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

import { useEffect } from "react";

export default function ImprovementStatsBtn() {
	const { isLogged, userId, pseudo } = useAuth();

	useEffect(() => {
		fetch("/api/stats-eve")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	}, []);

	return (
		<button type="button" id="improvement-stats-btn">
			Amélioration
			<div id="improvement-stats-btn-icon">
				<p>Équiper</p>
				<Image
					src="/assets/icons/updateStatsEVE_black.svg"
					alt="Icon"
					width={24}
					height={24}
				/>
			</div>
		</button>
	);
}
