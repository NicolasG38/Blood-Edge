import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Carrousel from "../../components/Carrousel";
import SectionBtn from "../../uiux/SectionBtn";
import ArsenalNanoSuits from "../../uiux/ArsenalNanoSuits";

export default function Homepage() {
	return (
		<>
			<Header />
			<main>
				<Carrousel />
				<SectionBtn />
				<ArsenalNanoSuits />
			</main>
			<Footer />
		</>
	);
}
