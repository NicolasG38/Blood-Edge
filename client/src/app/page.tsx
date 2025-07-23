import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Carrousel from "../../components/Carrousel";
import SectionArsenalBtn from "../../uiux/SectionArsenalBtn";
import ArsenalNanoSuits from "../../uiux/ArsenalNanoSuits";

export default function Homepage() {
	return (
		<>
			<Header />
			<main>
				<Carrousel />
				<SectionArsenalBtn />
				<ArsenalNanoSuits />
			</main>
			<Footer />
		</>
	);
}
