"use client";
import EquipmentList from "../../../../../components/EquipmentList";
import Header from "../../../../../components/Header";
import Footer from "../../../../../components/Footer";
import SubSection from "../../../../../uiux/SubSection";

export default function EquipmentPage() {
	return (
		<>
			<Header />
			<main className="parameter">
				<h1>JE SUIS SUR LE PAGE GEARS</h1>
				<EquipmentList />
				<SubSection />
			</main>
			<Footer />
		</>
	);
}
