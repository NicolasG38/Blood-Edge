"use client";
import Header from "../../../../../components/Header";
import Footer from "../../../../../components/Footer";
import ListNanoSuits from "../../../../../components/ListNanoSuits";
import CarrouselNanoSuits from "../../../../../components/CarrouselNanoSuits";
import { useState } from "react";
import SubSection from "../../../../../uiux/SubSection";

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
