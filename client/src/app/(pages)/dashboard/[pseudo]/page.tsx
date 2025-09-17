"use client";
import FavoriteCircle from "../../../../../uiux/FavoriteCircle";
import FavoriteCircleSubSection from "../../../../../uiux/FavoriteCircleSubSection";
import Footer from "../../../../../components/0_Home/Footer";
import Logout from "../../../../../uiux/Logout";
import DashboardHeader from "../../../../../components/0.2_Dashboard/DashboardHeader";
import Header from "../../../../../components/0_Home/Header";

export default function DashboardPage() {
	return (
		<>
			<Header />
			<main>
				<DashboardHeader />
				<Logout />
				<FavoriteCircle />
				<FavoriteCircleSubSection />
			</main>
			<Footer />
		</>
	);
}
