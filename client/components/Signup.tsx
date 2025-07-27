"use client";
import "./Signup.css";
import Image from "next/image";
import { useState } from "react";

export default function Signup() {
	const [isSuccess, setIsSuccess] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [isFailed, setIsFailed] = useState(false);
	const [showFail, setShowFail] = useState(false);

	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const formData = {
			email: form.get("email") as string,
			pseudo: form.get("username") as string,
			password: form.get("password") as string,
			is_accept_cgu: form.get("terms") === "on", // ou récupère la valeur de la checkbox
			type_account: 1, // ou une valeur par défaut
		};

		const response = await fetch(`${baseURL}/api/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		if (response.ok) {
			setShowSuccess(true);
			setIsSuccess(true);
		} else {
			setShowFail(true);
			setIsFailed(true);
		}
	};
	return (
		<div id="containerSignup" className={showSuccess ? "showSuccess" : ""}>
			<div className="loginSuccessMessage">
				<div id="loginSuccessText_1">
					<p>Félicitations ! Votre compte a bien été créé</p>
					<Image
						id="loginSuccessImage"
						src="/assets/icons/celebration.svg"
						alt="Success"
						width={24}
						height={24}
					/>
				</div>
				<p id="loginSuccessText_2">
					Vous êtes désormais connecté et allez être automatiquement redirigé
					vers le Dashboard
				</p>
			</div>
			{isFailed && <p>Une erreur est survenue lors de l'inscription</p>}
			<Image
				id="signupBackground"
				src="/assets/images/signup.jpg"
				alt="Background"
				width={1920}
				height={1080}
			/>
			<section id="signupForm">
				<form onSubmit={handleSubmit}>
					<Image
						id="signupLogo"
						src="/assets/logo/Blood-Edge_V1.webp"
						alt="Logo"
						width={188}
						height={150}
					/>
					<div id="signupDeco">
						<h1 id="signupTitle">INSCRIPTION</h1>{" "}
						<Image
							id="wavingHand"
							src="/assets/icons/emoji_people_black.svg"
							alt="Logo"
							width={24}
							height={24}
						/>
					</div>
					<p id="signupText">Créer un compte avec votre adresse email</p>
					<div id="signupInputs">
						<label htmlFor="username" className="signupLabel">
							Nom d'utilisateur :
						</label>
						<input
							type="text"
							id="username"
							name="username"
							className="signupInput"
							required
						/>
						<label htmlFor="email" className="signupLabel">
							Email :
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="signupInput"
							required
						/>
						<label htmlFor="password" className="signupLabel">
							Mot de passe :
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="signupInput"
							required
						/>
						<div id="signupTerms">
							<p id="signupLink">
								J'accepte les{" "}
								<a href="/terms" id="signupLink">
									conditions d'utilisation
								</a>
							</p>
							<label htmlFor="terms" className="signupLabelCheckbox">
								<input type="checkbox" name="terms" required />
							</label>
						</div>
						<button type="submit" className="loginAndsignUpFunctionnal signup">
							INSCRIPTION
							<Image
								id="signupIcon"
								src="/assets/icons/arrow_circle_right_black.svg"
								alt="Logo"
								width={24}
								height={24}
							/>
						</button>
					</div>
				</form>
			</section>
		</div>
	);
}
