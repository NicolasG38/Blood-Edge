import "./Login.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const router = useRouter();

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const formData = {
			pseudo: form.get("username") as string,
			password: form.get("password") as string,
		};

		const response = await fetch(`${baseURL}/api/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		const data = await response.json();
		if (!data.error) {
			router.push("/"); // Redirige vers la page souhaitée
		} else {
		}
		if (data.token) {
			localStorage.setItem("token", data.token);
		}

		if (!data.error && data.user) {
			localStorage.setItem("token", data.token);
			localStorage.setItem("pseudoStorage", data.user.User_pseudo);
			localStorage.setItem("userId", data.user.User_id);
			router.push("/"); // Redirige vers la page souhaitée
		}
	};

	return (
		<div id="containerLogin">
			<section id="loginForm">
				<form onSubmit={handleLogin}>
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
					<p id="loginText">Se connecter via son nom d'utilisateur</p>
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
