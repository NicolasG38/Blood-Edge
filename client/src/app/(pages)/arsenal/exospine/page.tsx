"use client";
import Header from "../../../../../components/Header";
import Footer from "../../../../../components/Footer";
import ExospineList from "../../../../../components/ExospineList";
import ExospineRepresentative from "../../../../../components/ExospineRepresentative";
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
				<div id="row">
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
