"use client";
import GearsList from "../../../../../components/EquipmentList";
import GearsRepresentative from "../../../../../components/EquipementRepresentative";
import Header from "../../../../../components/Header";
import Footer from "../../../../../components/Footer";
import SubSection from "../../../../../uiux/SubSection";
import { useState } from "react";
import StatsEVE from "../../../../../components/StatsEVE";
import ImprovementStatsBtn from "../../../../../uiux/ImprovementStatsBtn";

export default function EquipmentPage() {
	const [selectedId, setSelectedId] = useState<number | null>(null);
	return (
		<>
			<Header />
			<main className="parameter">
				<div className="row">
					<GearsList selectedId={selectedId} onSelect={setSelectedId} />
					<GearsRepresentative selectedId={selectedId} />
					<StatsEVE />
				</div>
				<ImprovementStatsBtn />
				<SubSection />
			</main>
			<Footer />
		</>
	);
}
