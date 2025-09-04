import "./Logout.css";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Logout() {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const context = useContext(AuthContext);
	const { isLogged, setAuth } = context;
	const router = useRouter();

	const handleLogout = async () => {
		await fetch(`${baseURL}/api/logout`, {
			method: "POST",
			credentials: "include",
		});
		setAuth({ userId: null, pseudo: null, isLogged: false });
		router.push("/");
	};

	return (
		<div id="logout-container">
			{isLogged && (
				<button
					type="button"
					id="logoutBtn"
					onClick={() => {
						handleLogout();
					}}
					tabIndex={0}
				>
					Déconnexion
					<Image
						className="logout-icon"
						src="/assets/icons/logout.svg"
						alt="Logout Icon"
						width={36}
						height={36}
					/>
				</button>
			)}
		</div>
	);
}

// ajouter la logique de déconnexion ici
