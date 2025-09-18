"use client";
import "./SignUpLoginBtn.css";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignUpLoginBtnProps {
	onSignupClick?: () => void;
	onLoginClick?: () => void;
}

export default function SignUpLoginBtn({
	onSignupClick,
	onLoginClick,
}: SignUpLoginBtnProps) {
	const [hovered, setHovered] = useState(false);
	const router = useRouter();
	const { userId, pseudo, isLogged, setAuth } = useAuth();
	const openLogin = () => (onLoginClick ?? onSignupClick)?.();

	return (
		<section id="containerSignUplogin">
			<button
				type="button"
				id="signuplogin"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onClick={() => {
					if (!isLogged) openLogin();
					else {
						router.push(`/dashboard/${pseudo}`);
					}
				}}
				tabIndex={0}
			>
				<div
					id="btnSignup"
					onClick={() => {
						if (!isLogged) openLogin();
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							if (!isLogged) openLogin();
						}
					}}
					aria-label={
						isLogged ? "Mon Tetrapod" : "Ouvrir la fenêtre de connexion"
					}
				>
					<p>{isLogged ? "Mon Tetrapod" : "S'inscrire"}</p>
				</div>
				<div
					id="btnLogin"
					style={{
						transition: "0.35s ease-in-out",
						background: hovered
							? isLogged
								? "linear-gradient(90deg, #C9A227 0%, #76520E 100%)"
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
						{isLogged ? "Dashboard" : "Se connecter"}
					</p>
					<Image
						id="loginIcon"
						src={
							hovered
								? isLogged
									? "/assets/icons/dashboard_yellow.svg"
									: "/assets/icons/contacts_product_blue.svg"
								: isLogged
									? "/assets/icons/dashboard_white.svg"
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
