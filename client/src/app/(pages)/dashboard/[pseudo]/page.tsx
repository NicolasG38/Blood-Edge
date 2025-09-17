"use client";
import Footer from "../../../../../components/0_Home/Footer";
import Logout from "../../../../../uiux/Logout";
import Pseudo from "../../../../../components/0.2_Dashboard/DashboardHeader";
import Header from "../../../../../components/0_Home/Header";

export default function DashboardPage() {
	return (
		<>
			<Header />
			<main>
				<Pseudo />
				<Logout />
			</main>
			<Footer />
		</>
	);
}
