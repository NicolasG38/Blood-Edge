"use client";
import Header from "../../../../../components/Header";
import Footer from "../../../../../components/Footer";
import ListNanoSuits from "../../../../../components/ListNanoSuits";
import CarrouselNanoSuits from "../../../../../components/CarrouselNanoSuits";
import { useState } from "react";

export default function NanoSuitsPage() {
	const [selectedId, setSelectedId] = useState<number | null>(null);
	return (
		<>
			<Header />
			<main className="parameter">
				<ListNanoSuits onSelect={setSelectedId} />
				<CarrouselNanoSuits selectedId={selectedId} />
			</main>
			<Footer />
		</>
	);
}
