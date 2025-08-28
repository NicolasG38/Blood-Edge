"use client";
import Header from "../../../../../components/0_Home/Header";
import Footer from "../../../../../components/0_Home/Footer";
import ExospineList from "../../../../../components/1.1_Arsenal/1.1.1_Exospine/ExospineList";
import ExospineRepresentative from "../../../../../components/1.1_Arsenal/1.1.1_Exospine/ExospineRepresentative";
import StatsEVE from "../../../../../components/StatsEVE";
import SubSection from "../../../../../uiux/SubSection";
import ImprovementStatsBtn from "../../../../../uiux/ImprovementStatsBtn";
import { useState } from "react";

export default function ExospinePage() {
	const [selectedId, setSelectedId] = useState<number | null>(null);
	return (
		<>
			<Header />
			<main className="parameter">
				<div className="row">
					<ExospineList selectedId={selectedId} onSelect={setSelectedId} />
					<ExospineRepresentative selectedId={selectedId} />
					<StatsEVE />
				</div>
				<ImprovementStatsBtn />
				<SubSection />
			</main>
			<Footer />
		</>
	);
}
