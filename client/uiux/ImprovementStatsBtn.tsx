import "./ImprovementStatsBtn.css";
import Image from "next/image";

export default function ImprovementStatsBtn() {
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
