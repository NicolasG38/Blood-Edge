import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Login from "../../../../components/Login";
import Signup from "../../../../components/Signup";

export default function SignUpLogin() {
	return (
		<>
			<Header />
			<main className="parameter">
				<Login />
				<Signup />
			</main>
			<Footer />
		</>
	);
}
