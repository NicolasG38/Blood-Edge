"use client";
import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";

interface LoginUser {
	User_id: number | string;
	User_pseudo: string;
}
interface Payload {
	token: string;
	user: LoginUser;
}

type Props = {
	initialView?: "login" | "signup";
	delayMs?: number; // durée visibilité message succès avant fermeture
	onAuthenticated?: (p: Payload) => void;
	onClose?: () => void; // fermeture modal (fourni par Header)
};

export default function LoginWrapper({
	initialView = "login",
	delayMs = 2000,
	onAuthenticated,
	onClose,
}: Props) {
	const [view, setView] = useState<"login" | "signup">(initialView);
	const [pending, setPending] = useState<Payload | null>(null); // succès en attente de commit
	const [closing, setClosing] = useState(false); // transition succès

	// Commit token après délai
	useEffect(() => {
		if (!pending) return;
		setClosing(true);
		const id = setTimeout(() => {
			try {
				localStorage.setItem("token", pending.token);
				localStorage.setItem("pseudoStorage", pending.user.User_pseudo);
				localStorage.setItem("userId", String(pending.user.User_id));
			} catch {}
			onAuthenticated?.(pending);
			setPending(null);
			setClosing(false);
			onClose?.(); // ferme la modal après succès
		}, delayMs);
		return () => clearTimeout(id);
	}, [pending, delayMs, onAuthenticated, onClose]);

	// Déjà authentifié ? (évite afficher le formulaire si token présent)
	useEffect(() => {
		if (localStorage.getItem("token")) {
			onAuthenticated?.({
				token: localStorage.getItem("token") || "",
				user: {
					User_id: localStorage.getItem("userId") || "",
					User_pseudo: localStorage.getItem("pseudoStorage") || "",
				},
			});
			onClose?.();
		}
	}, [onAuthenticated, onClose]);

	if (closing) {
		// Laisse le composant Login afficher son message succès (il reste monté)
		return null; // Rien de spécifique ici: le message est dans Login
	}

	if (view === "signup") {
		return <Signup onSuccess={() => setView("login")} />;
	}

	return (
		<Login
			onSuccess={(payload: Payload) => setPending(payload)}
			onSwitch={() => setView("signup")}
		/>
	);
}
