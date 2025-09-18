import "./DashboardPage.css";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface User {
	User_id: number;
	User_pseudo: string;
	User_email: string;
	User_timestamp: string;
	inscriptionDuration: string;
}
interface AuthContextType {
	isLogged: boolean;
	pseudo?: string | null;
}

export default function DashboardHeader() {
	const params = useParams();

	const pseudos = typeof params === "object" ? params.pseudo : params;
	const [users, setUsers] = useState<User | null>(null);
	const { isLogged, pseudo: authPseudo } = useAuth() as AuthContextType;
	const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3310";

	useEffect(() => {
		if (!pseudos) return;
		fetch(`${baseURL}/api/users/${pseudos}`)
			.then((response) => response.json())
			.then(setUsers);
	}, [baseURL, pseudos]);

	return (
		<div id="dashboardHeader">
			<h1 className="dashboardTitle">
				{isLogged && authPseudo === pseudos
					? `Hello, ${users?.User_pseudo}`
					: users?.User_pseudo}
			</h1>

			<div id="containerInfos">
				{isLogged && authPseudo === pseudos && (
					<p id="dashboardEmail">{users?.User_email}</p>
				)}
				<p id="dashboardMembershipDate">
					Membre depuis : {users?.inscriptionDuration}
				</p>
			</div>
		</div>
	);
}
