import "./Signup.css";
import Image from "next/image";

export default function Signup() {
	return (
		<div id="containerSignup">
			<section id="signupForm">
				<form>
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
