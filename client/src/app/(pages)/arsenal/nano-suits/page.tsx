import Header from "../../../../../components/Header";
import Footer from "../../../../../components/Footer";
import ListNanoSuits from "../../../../../components/ListNanoSuits";
import CarrouselNanoSuits from "../../../../../components/CarrouselNanoSuits";

export default function SignUpLogin() {
	return (
		<>
			<Header />
			<main className="parameter">
				<ListNanoSuits />
				<CarrouselNanoSuits />
			</main>
			<Footer />
		</>
	);
}
