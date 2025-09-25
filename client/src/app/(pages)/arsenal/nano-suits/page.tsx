"use client";
import Header from "../../../../../components/0_Home/Header";
import Footer from "../../../../../components/0_Home/Footer";
import ListNanoSuits from "../../../../../components/1.1_Arsenal/1.1.3_Nano-suits/ListNanoSuits";
import CarrouselNanoSuits from "../../../../../components/1.1_Arsenal/1.1.3_Nano-suits/CarrouselNanoSuits";
import { useState } from "react";
import SubSection from "../../../../../components/0_Home/SubSection";

export default function NanoSuitsPage() {
	const [selectedId, setSelectedId] = useState<number | null>(null);
	return (
		<>
			<Header />
			<main className="parameter">
				<div className="row">
					<ListNanoSuits onSelect={setSelectedId} />
					<CarrouselNanoSuits selectedId={selectedId} />
				</div>
				<SubSection />
			</main>
			<Footer />
		</>
	);
}
