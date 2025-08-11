"use client";
import "./Signup.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

type SignupProps = { onSuccess?: () => void };

export default function Signup({ onSuccess }: SignupProps) {
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const apiUrl = baseURL ? `${baseURL}/api/users` : "/api/users";

	interface FieldValidation {
		_errors?: string[];
	}
	interface SignupErrorDetails {
		email_confirm?: FieldValidation;
		password?: FieldValidation;
		[key: string]: FieldValidation | undefined;
	}
	interface SignupResponse {
		message?: string;
		error?: string;
		details?: SignupErrorDetails;
		token?: string;
	}

	function buildPasswordErrors(pw: string): string[] {
		const errs: string[] = [];
		if (pw.length < 8) errs.push("≥8 car.");
		if (!/[a-z]/.test(pw)) errs.push("1 minuscule");
		if (!/[A-Z]/.test(pw)) errs.push("1 majuscule");
		if (!/[0-9]/.test(pw)) errs.push("1 chiffre");
		if (!/[^A-Za-z0-9]/.test(pw)) errs.push("1 spécial");
		return errs;
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (loading) return;
		setShowSuccess(false);
		setError(null);
		setShowFail(false);

		const form = new FormData(event.currentTarget);

		const password = (form.get("password") as string) || "";
		const pwErrs = buildPasswordErrors(password);
		if (pwErrs.length) {
			setError("Mot de passe invalide, il doit contenir: " + pwErrs.join(", "));
			setShowFail(true);
			return;
		}

		const email = (form.get("email") as string)?.trim();
		const emailConfirm = (form.get("email_confirm") as string)?.trim();

		if (email !== emailConfirm) {
			setError("Les emails ne correspondent pas");
			setShowFail(true);
			return;
		}

		const formData = {
			email,
			email_confirm: emailConfirm,
			pseudo: (form.get("username") as string)?.trim(),
			password: form.get("password") as string,
			is_accept_cgu: form.get("terms") === "on",
			type_account: 1,
		};

		setLoading(true);
		try {
			const response = await fetch(apiUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			let data: SignupResponse | null = null;
			try {
				data = (await response.json()) as SignupResponse;
			} catch {
				/* pas de body JSON */
			}

			if (response.ok) {
				setShowSuccess(true);
				setTimeout(() => {
					onSuccess?.();
					router.push("/dashboard");
				}, 5000);
			} else {
				console.log("Signup validation details:", data);
				const serverMsg =
					data?.message ||
					data?.error ||
					data?.details?.email_confirm?._errors?.[0] ||
					data?.details?.password?._errors?.[0] ||
					(data?.details && "Validation distante échouée") ||
					"Erreur lors de l'inscription";
				setError(serverMsg);
				setShowFail(true);
			}
		} catch {
			setError("Erreur réseau");
			setShowFail(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div
				id="containerSignup"
				className={showSuccess ? "showSuccess" : "showFail"}
				aria-live="polite"
			>
				{showSuccess && (
					<div className="signupSuccessMessage">
						<div id="signupSuccessText_1">
							<p>Félicitations ! Votre compte a bien été créé</p>
							<Image
								id="signupSuccessImage"
								src="/assets/icons/celebration.svg"
								alt="Succès"
								width={24}
								height={24}
							/>
						</div>
						<p id="signupSuccessText_2">
							Vous allez être redirigé automatiquement vers le tableau de bord.
						</p>
					</div>
				)}
				{showFail && !showSuccess && (
					<div className="signupFailMessage" role="alert">
						{error && (
							<div id="signupErrorContainer">
								<div id="signupErrorIconContainer">
									<p className="signupError_1">Une erreur est survenue !</p>
									<Image
										id="signupErrorIcon"
										src="/assets/icons/sentiment_dissatisfied.svg"
										alt="Erreur"
										width={24}
										height={24}
									/>
								</div>
								<p className="signupError_2" role="alert">
									{error}
								</p>
							</div>
						)}
					</div>
				)}
				<Image
					id="signupBackground"
					src="/assets/images/signup.jpg"
					alt="Background"
					width={1920}
					height={1080}
				/>
				<section id="signupForm" aria-hidden={showSuccess}>
					{!showSuccess && (
						<form onSubmit={handleSubmit} noValidate>
							<Image
								id="signupLogo"
								src="/assets/logo/Blood-Edge_V1.webp"
								alt="Logo"
								width={188}
								height={150}
							/>
							<div id="signupDeco">
								<h1 id="signupTitle">INSCRIPTION</h1>
								<Image
									id="wavingHand"
									src="/assets/icons/emoji_people_black.svg"
									alt=""
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
									autoComplete="username"
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
									autoComplete="email"
									required
								/>
								<label htmlFor="email_confirm" className="signupLabel">
									Confirmation d'email :
								</label>
								<input
									type="email"
									id="email_confirm"
									name="email_confirm"
									className="signupInput"
									autoComplete="email"
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
									autoComplete="new-password"
									required
								/>
								<div id="signupTerms">
									<p id="signupLink">
										J'accepte les{" "}
										<a href="/terms" id="signupLink_2">
											conditions d'utilisation
										</a>
									</p>
									<label htmlFor="terms" className="signupLabelCheckbox">
										<input type="checkbox" name="terms" id="terms" required />{" "}
										<span>Obligatoire</span>
									</label>
								</div>

								<button
									type="submit"
									className="loginAndsignUpFunctionnal signup"
									disabled={loading}
									aria-busy={loading}
								>
									{loading ? "ENVOI..." : "INSCRIPTION"}
									<Image
										id="signupIcon"
										src="/assets/icons/arrow_circle_right_black.svg"
										alt=""
										width={24}
										height={24}
									/>
								</button>
							</div>
						</form>
					)}
				</section>
			</div>
		</>
	);
}
