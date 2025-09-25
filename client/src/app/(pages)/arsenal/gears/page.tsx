"use client";
import GearsList from "../../../../../components/1.1_Arsenal/1.1.2_Gears/GearsList";
import GearsRepresentative from "../../../../../components/1.1_Arsenal/1.1.2_Gears/GearsRepresentative";
import Header from "../../../../../components/0_Home/Header";
import Footer from "../../../../../components/0_Home/Footer";
import SubSection from "../../../../../components/0_Home/SubSection";
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
