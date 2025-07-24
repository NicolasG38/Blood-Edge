"use client";
import "./Signup.css";
import Image from "next/image";

export default function Signup() {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const formData = {
			email: form.get("email") as string,
			pseudo: form.get("username") as string,
			hashed_password: form.get("password") as string,
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
		const data = await response.json();
		console.log(data);
	};
	return (
		<div id="containerSignup">
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
