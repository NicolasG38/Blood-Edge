"use client";
import Header from "../../../../../components/Header";
import Footer from "../../../../../components/Footer";
import ExospineList from "../../../../../components/ExospineList";
import SubSection from "../../../../../uiux/SubSection";

export default function ExospinePage() {
	return (
		<>
			<Header />
			<main className="parameter">
				<h1>JE SUIS SUR LE PAGE EXOSPINE</h1>
				<ExospineList />
				<SubSection />
			</main>
			<Footer />
		</>
	);
}
