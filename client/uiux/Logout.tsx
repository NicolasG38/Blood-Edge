import "./Logout.css";
import { useAuth } from "../context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface AuthContextType {
	isLogged: boolean;
	pseudo?: string | null;
	setAuth: (auth: {
		userId: number | null;
		pseudo: string | null;
		isLogged: boolean;
	}) => void;
}

export default function Logout() {
	const params = useParams();

	const pseudos = typeof params === "object" ? params.pseudo : params;
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const {
		isLogged,
		pseudo: authPseudo,
		setAuth,
	} = useAuth() as AuthContextType;
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
			{isLogged && authPseudo === pseudos && (
				<button
					type="button"
					id="logoutBtn"
					onClick={handleLogout}
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
