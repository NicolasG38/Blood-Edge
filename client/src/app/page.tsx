import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Carrousel from "../../components/Carrousel";
import SectionBtn from "../../uiux/SectionBtn";
import SubSection from "../../uiux/SubSection";

export default function Homepage() {
	return (
		<>
			<Header />
			<main>
				<Carrousel />
				<SectionBtn />
				<SubSection />
			</main>
			<Footer />
		</>
	);
}
