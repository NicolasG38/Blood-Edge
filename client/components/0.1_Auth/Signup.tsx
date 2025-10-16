"use client";
import "./Signup.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

type SignupProps = { onSuccess?: () => void; onSwitch: () => void };

export default function Signup({ onSuccess, onSwitch }: SignupProps) {
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const router = useRouter();
	const { setAuth } = useAuth(); // au lieu de const { auth } = useAuth();
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
	interface SignupUser {
		Users_id: number;
		Users_pseudo: string;
		// Add other user fields if needed
	}

	interface SignupResponse {
		message?: string;
		error?: string;
		code?: string;
		details?: SignupErrorDetails;
		token?: string;
		user?: SignupUser;
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

		const emptyForm = Object.values(Object.fromEntries(form)).every(
			(v) => v === "" || v === undefined || v === null,
		);
		if (emptyForm) {
			setError("Le formulaire ne peut pas être vide.");
			setShowFail(true);
			return;
		}

		const email = (form.get("email") as string)?.trim();
		const emailConfirm = (form.get("email_confirm") as string)?.trim();
		const pseudo = (form.get("pseudo") as string)?.trim();
		const password = (form.get("password") as string) || "";
		const terms = form.get("terms") === "on";

		const errors: string[] = [];

		if (!email || !emailConfirm) errors.push("Email manquant");
		if (email !== emailConfirm) errors.push("Les emails ne correspondent pas");
		if (!pseudo || pseudo.length < 3) errors.push("Pseudo trop court");
		if (!terms) errors.push("CGU non acceptées");
		const pwErrs = buildPasswordErrors(password);
		if (pwErrs.length)
			errors.push(`Mot de passe invalide: ${pwErrs.join(", ")}`);

		if (errors.length) {
			setError(`Veuillez corriger les champs suivants : ${errors.join(" | ")}`);
			setShowFail(true);
			return;
		}

		const formData = {
			email,
			email_confirm: emailConfirm,
			pseudo: (form.get("pseudo") as string)?.trim(),
			password: form.get("password") as string,
			is_accept_cgu: form.get("terms") === "on",
			type_account: 1,
		};

		setLoading(true);
		try {
			const response = await fetch(apiUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify(formData),
			});
			const data: SignupResponse = await response.json();

			// Gestion explicite des conflits (409)
			if (response.status === 409) {
				const map: Record<string, string> = {
					PSEUDO_TAKEN: "Pseudo déjà utilisé",
					EMAIL_TAKEN: "Email déjà utilisé",
					PSEUDO_OR_EMAIL_TAKEN: "Pseudo ou email déjà utilisé",
					UNIQUE_VIOLATION: "Valeur déjà utilisée",
				};

				const code = data?.code ?? "";
				const errKey = data?.error ?? "";

				setError(data?.message || map[code] || map[errKey] || "Conflit");
				setShowFail(true);
				return;
			}

			if (response.ok && data?.token && data.user) {
				setAuth({
					userId: data.user?.Users_id ? Number(data.user.Users_id) : 0,
					pseudo: data.user.Users_pseudo,
					isLogged: true,
				});

				setShowSuccess(true);
				setTimeout(() => {
					onSuccess?.();
					if (window.location.pathname !== "/dashboard") {
						router.push(`/dashboard/${data.user?.Users_pseudo}`);
					}
				}, 4000);
			} else {
				const serverMsg =
					data?.details?.is_accept_cgu?._errors?.[0] ||
					data?.details?.email_confirm?._errors?.[0] ||
					data?.details?.password?._errors?.[0] ||
					data?.details?.pseudo?._errors?.[0] ||
					data?.message ||
					(data?.error !== "VALIDATION_ERROR" && data?.error) ||
					(data?.details && "Validation distante échouée") ||
					"Erreur lors de l'inscription";
				setError(serverMsg);
				setShowFail(true);
			}
		} catch (e) {
			console.error("[SIGNUP] fetch error", e);
			setError("Erreur réseau");
			setShowFail(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// Cette partie ne s’exécute que côté client
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			<div
				id="containerSignup"
				className={showSuccess ? "showSuccess" : showFail ? "showFail" : ""}
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
									src={
										isMobile
											? showFail
												? "/assets/icons/emoji_people_white.svg"
												: "/assets/icons/emoji_people_black.svg"
											: "/assets/icons/emoji_people_black.svg"
									}
									alt=""
									width={24}
									height={24}
								/>
							</div>
							<p id="signupText">Créer un compte avec votre adresse email</p>
							<div id="signupInputs">
								<label htmlFor="pseudo" className="signupLabel">
									Nom d&#39;utilisateur :
								</label>
								<input
									type="text"
									id="pseudo"
									name="pseudo"
									className="signupInput"
									autoComplete="username"
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
								/>
								<label htmlFor="email_confirm" className="signupLabel">
									Confirmation d&#39;email :
								</label>
								<input
									type="email"
									id="email_confirm"
									name="email_confirm"
									className="signupInput"
									autoComplete="email"
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
								/>
								<p id="signupPasswordHint">
									Le mot de passe doit contenir au moins 8 caractères dont:
									<span>
										1 MAJUSCULE
										<br />1 minuscule
										<br />1 chiffre
										<br />1 caractères spécial
									</span>
								</p>
								<div id="signupTerms">
									<p id="signupLink">
										J&#39;accepte les{" "}
										<a href="/terms" id="signupLink_2">
											conditions d&#39;utilisation
										</a>
									</p>
									<label htmlFor="terms" className="signupLabelCheckbox">
										<input type="checkbox" name="terms" id="terms" />{" "}
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
							<button
								id="signupSwitch"
								type="button"
								onClick={onSwitch}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										onSwitch();
									}
								}}
							>
								Déjà un compte ? Se connecter
							</button>
						</form>
					)}
				</section>
			</div>
		</>
	);
}
