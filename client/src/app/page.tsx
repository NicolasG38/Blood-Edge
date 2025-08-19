"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Carrousel from "../../components/Carrousel";
import Modal from "../../components/Modal";
import SectionBtn from "../../uiux/SectionBtn";
import Login from "../../components/Login";
import SubSection from "../../uiux/SubSection";

import { useState } from "react";
import LocationsBtn from "../../uiux/LocationsBtn";

export default function Homepage() {
	const [openLogin, setOpenLogin] = useState(false);
	return (
		<>
			<Header />
			<main className="parameter">
				<Modal open={openLogin} onClose={() => setOpenLogin(false)}>
					<Login
						onSuccess={() => setOpenLogin(false)}
						onSwitch={() => setOpenLogin(false)}
					/>
				</Modal>
				<Carrousel />
				<LocationsBtn />
				<SectionBtn />
				<SubSection />
			</main>
			<Footer />
		</>
	);
}
