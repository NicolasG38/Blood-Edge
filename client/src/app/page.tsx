import Image from "next/image";
import styles from "./page.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Carrousel from "../../components/Carrousel";
import SectionArsenalBtn from "../../uiux/SectionArsenalBtn";

export default function Homepage() {
	return (
		<>
			<Header />
			<Carrousel />
			<SectionArsenalBtn />
			<Footer />
		</>
	);
}
