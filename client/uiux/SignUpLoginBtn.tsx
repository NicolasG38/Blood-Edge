"use client";
import "./SignUpLoginBtn.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface SignUpLoginBtnProps {
	onSignupClick?: () => void;
	onLoginClick?: () => void;
}

export default function SignUpLoginBtn({
	onSignupClick,
	onLoginClick,
}: SignUpLoginBtnProps) {
	const [hovered, setHovered] = useState(false);
	const [isLogged, setIsLogged] = useState(false);
	const router = useRouter();
	const openLogin = () => (onLoginClick ?? onSignupClick)?.(); // fallback si onLoginClick pas fourni

	useEffect(() => {
		setIsLogged(!!localStorage.getItem("token"));
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLogged(false);
		router.push("/");
	};

	return (
		<section id="containerSignUplogin">
			<button
				type="button"
				id="signuplogin"
				onClick={() => {
					if (!isLogged) openLogin();
					else handleLogout();
				}}
				tabIndex={0}
			>
				<div
					id="btnSignup"
					onClick={(e) => {
						e.stopPropagation();
						if (!isLogged) openLogin(); // garde login par défaut
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							if (!isLogged) openLogin();
						}
					}}
					aria-label={
						isLogged ? "Se déconnecter" : "Ouvrir la fenêtre de connexion"
					}
				>
					<p>{isLogged ? "se déconnecter" : "S'inscrire"}</p>
				</div>
				<div
					id="btnLogin"
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
					onClick={isLogged ? handleLogout : undefined}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							if (isLogged) handleLogout();
							else openLogin();
						}
					}}
					style={{
						transition: "0.35s ease-in-out",
						background: hovered
							? isLogged
								? "linear-gradient(90deg, #e01e37 0%, #b21e35 100%)"
								: "linear-gradient(90deg, #ccff33 0%, #7a991f 100%)"
							: "transparent",
					}}
				>
					<p
						style={{
							transition: "0.35s ease-in-out",
							color: hovered ? (isLogged ? "#F3F7FD" : "#1959b0") : "#fdfdfd",
						}}
					>
						{isLogged ? "Déconnexion" : "Se connecter"}
					</p>
					<Image
						id="loginIcon"
						src={
							hovered
								? isLogged
									? "/assets/icons/logout.svg"
									: "/assets/icons/contacts_product_blue.svg"
								: "/assets/icons/contacts_product.svg"
						}
						alt="Login Icon"
						width={24}
						height={24}
						style={{
							transition: "0.35s ease-in-out",
						}}
					/>
				</div>
			</button>
		</section>
	);
}
