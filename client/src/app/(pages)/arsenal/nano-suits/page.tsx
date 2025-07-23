import Header from "../../../../../components/Header";
import Footer from "../../../../../components/Footer";

import ListNanoSuits from "../../../../../components/ListNanoSuits";

export default function SignUpLogin() {
	return (
		<>
			<Header />
			<main className="parameter">
				<ListNanoSuits />
			</main>
			<Footer />
		</>
	);
}
