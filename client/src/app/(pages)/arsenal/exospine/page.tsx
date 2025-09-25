"use client";
import Header from "../../../../../components/0_Home/Header";
import Footer from "../../../../../components/0_Home/Footer";
import ExospineList from "../../../../../components/1.1_Arsenal/1.1.1_Exospine/ExospineList";
import ExospineRepresentative from "../../../../../components/1.1_Arsenal/1.1.1_Exospine/ExospineRepresentative";
import ExospineSearchBar from "../../../../../components/1.1_Arsenal/1.1.1_Exospine/ExospineSearchBar";
import StatsEVE from "../../../../../components/StatsEVE";
import SubSection from "../../../../../components/0_Home/SubSection";
import ImprovementStatsBtn from "../../../../../uiux/ImprovementStatsBtn";
import ListBtn from "../../../../../uiux/ListBtn";
import { useState } from "react";

export default function ExospinePage() {
	const [selectedId, setSelectedId] = useState<number | null>(null);
	return (
		<>
			<Header />
			<main className="parameter">
				<ExospineSearchBar />
				<div className="row">
					<ExospineList selectedId={selectedId} onSelect={setSelectedId} />
					<ExospineRepresentative selectedId={selectedId} />
					<ListBtn />
					<StatsEVE />
				</div>
				<ImprovementStatsBtn />
				<SubSection />
			</main>
			<Footer />
		</>
	);
}
