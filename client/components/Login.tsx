import "./Login.css";
import Image from "next/image";

export default function Login() {
	return (
		<div id="containerLogin">
			<section id="loginForm">
				<form>
					<Image
						id="loginLogo"
						src="/assets/logo/Blood-Edge_V1.webp"
						alt="Logo"
						width={188}
						height={150}
					/>
					<div id="loginDeco">
						<h1 id="loginTitle">CONNEXION</h1>{" "}
						<Image
							id="wavingHand"
							src="/assets/icons/waving_hand.svg"
							alt="Logo"
							width={24}
							height={24}
						/>
					</div>
					<p id="loginText">Se connecter via son adresse email</p>
					<div id="loginInputs">
						<label htmlFor="username" className="loginLabel">
							Nom d'utilisateur :
						</label>
						<input
							type="text"
							id="username"
							name="username"
							className="loginInput"
							required
						/>
						<label htmlFor="password" className="loginLabel">
							Mot de passe :
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="loginInput"
							required
						/>
						<button
							type="submit"
							className="loginAndsignUpFunctionnal connection"
						>
							CONNEXION
							<Image
								id="loginIcon"
								src="/assets/icons/login.svg"
								alt="Logo"
								width={24}
								height={24}
							/>
						</button>
					</div>
				</form>
				<hr />
				<p id="loginText2">Vous n'avez pas de compte ?</p>
				<a href="/signup&login" className="loginLink">
					S'inscrire
				</a>
				<button type="button" className="loginAndsignUpFunctionnal signup">
					INSCRIPTION
					<Image
						id="loginIcon"
						src="/assets/icons/arrow_circle_right_black.svg"
						alt="Logo"
						width={24}
						height={24}
					/>
				</button>
			</section>
		</div>
	);
}
