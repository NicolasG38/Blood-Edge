"use client";
import "../../components/0_Home/home.css";

import Header from "../../components/0_Home/Header";
import Footer from "../../components/0_Home/Footer";
import Carrousel from "../../components/0_Home/Carrousel";
import Modal from "../../components/0.1_Auth/Modal";
import SectionBtn from "../../components/0_Home/SectionBtn";
import SubSection from "../../components/0_Home/SubSection";
import Login from "../../components/0.1_Auth/Login";
import StellarBladeTimeline from "../../components/X_StellarBlade_Timeline";

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
				{openLogin && <Login setOpenLogin={setOpenLogin} />}
				<Carrousel />
				<LocationsBtn />

				<SectionBtn className="section-btn-desktop" />
				<SubSection className="subsection-btn-desktop" />
			</main>
			<Footer />
		</>
	);
}
