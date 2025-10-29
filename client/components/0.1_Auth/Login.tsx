"use client";
import "./Login.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Signup from "./Signup";
import { useLanguage } from "../../context/LangContext";

export type Payload = {
	token: string;
	user: {
		Users_id: string | number;
		Users_pseudo: string;
	};
};

type LoginProps = {
	onSuccess?: (payload: Payload) => void; // changé
	onSwitch?: () => void;
	setOpenLogin?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({ onSuccess, onSwitch }: LoginProps) {
	const baseURL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
	const { lang } = useLanguage();
	const traduction = (fr: string, en: string) => (lang === "en" ? en : fr);
	const router = useRouter();
	const { setAuth } = useAuth();
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
	const [message, setMessage] = useState<React.ReactNode>(null);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);
	const [internalMode, setInternalMode] = useState<"login" | "signup">("login");
	const [isMobile, setIsMobile] = useState(false);
	const [fieldErr, setFieldErr] = useState<{
		username?: string;
		password?: string;
	}>({});

	const effectiveSwitch =
		onSwitch ??
		(() => setInternalMode((m) => (m === "login" ? "signup" : "login")));

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (loading) return;

		setLoading(true);
		setStatus("idle");
		setMessage(null);
		setShowSuccess(false);
		setShowFail(false);
		setFieldErr({});

		const form = new FormData(event.currentTarget);
		const payload = {
			pseudo: (form.get("username") as string)?.trim(),
			password: form.get("password") as string,
		};

		// validation client simple
		const nextErr: { username?: string; password?: string } = {};
		if (!payload.pseudo) nextErr.username = "Nom d'utilisateur requis";
		if (!payload.password) nextErr.password = "Mot de passe requis";
		if (nextErr.username || nextErr.password) {
			setFieldErr(nextErr);
			setStatus("error");
			setMessage(
				<>
					<Image
						id="signupErrorIcon"
						src="/assets/icons/sentiment_dissatisfied.svg"
						alt="Erreur"
						width={24}
						height={24}
					/>
					<span style={{ marginLeft: 8 }}>
						{traduction(
							"Veuillez corriger les champs en erreur",
							"Please correct the fields with errors",
						)}
					</span>
				</>,
			);
			setShowFail(true);
			setLoading(false);
			return;
		}

		try {
			const response = await fetch(`${baseURL}/api/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify(payload),
			});

			type LoginResponse = {
				error?: string;
				message?: string;
				token?: string;
				user?: {
					Users_pseudo: string;
					Users_id: string;
					// add other user fields if needed
				};
			};
			let data: LoginResponse | null = null;
			try {
				data = await response.json();
			} catch {
				/* ignore */
			}

			if (response.ok && data?.token && data.user) {
				localStorage.setItem("pseudoStorage", data.user.Users_pseudo);

				const payload: Payload = {
					token: data.token,
					user: {
						Users_id: data.user.Users_id,
						Users_pseudo: data.user.Users_pseudo,
					},
				};

				setStatus("success");
				setMessage(data?.message || "Connexion réussie");

				setShowSuccess(true);
				setShowFail(false);

				setTimeout(() => {
					onSuccess?.(payload);
					setAuth({
						userId: data.user?.Users_id ? Number(data.user.Users_id) : 0,
						pseudo: data.user?.Users_pseudo ?? "",
						isLogged: true,
					});
					if (!isMobile) {
						window.location.reload();
					} else {
						router.push(`/dashboard/${data.user?.Users_pseudo ?? ""}`);
					}
				}, 2000);
			} else {
				const msg =
					data?.message ||
					data?.error ||
					(!response.ok && `Erreur ${response.status}`) ||
					"Identifiants/Mot de passe incorrects";
				// map minimal: si 401/403 → marquer les deux champs
				if (response.status === 401 || response.status === 403) {
					setFieldErr({
						username: "Identifiants invalides",
						password: "Identifiants invalides",
					});
				}
				setStatus("error");
				setMessage(msg);
				setShowFail(true);
				setShowSuccess(false);
			}
		} catch {
			setStatus("error");
			setMessage("Erreur réseau");
			setShowFail(true);
			setShowSuccess(false);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (internalMode === "signup" && !onSwitch) {
		return (
			<Signup
				onSwitch={() => {
					setInternalMode("login");
				}}
			/>
		);
	}

	return (
		<div
			id="containerLogin"
			aria-live="polite"
			className={`${showSuccess ? "showSuccess" : ""} ${showFail ? "showFail" : ""}`}
		>
			<section id="loginForm">
				{status !== "idle" && (
					<div id="loginMessageContainer">
						<div
							className={`loginMessage ${status === "success" ? "success" : "fail"} show`}
							role={status === "success" ? "success" : "fail"}
						>
							{message}
						</div>
					</div>
				)}

				<form onSubmit={handleLogin}>
					<Image
						id="loginLogo"
						src="/assets/logo/Blood-Edge_V1.webp"
						alt="Logo"
						width={188}
						height={150}
					/>
					<div id="loginDeco">
						<h1 id="loginTitle">{traduction("CONNEXION", "LOGIN")}</h1>
						<Image
							id="wavingHand"
							src={
								isMobile
									? showFail
										? "/assets/icons/waving_hand_white.svg"
										: "/assets/icons/waving_hand_black.svg"
									: "/assets/icons/waving_hand_black.svg"
							}
							alt="Logo"
							width={24}
							height={24}
						/>
					</div>
					<p id="loginText">
						{traduction(
							"Se connecter via son nom d'utilisateur",
							"Log in with your username",
						)}
					</p>
					<div id="loginInputs">
						<div className="loginContainer">
							<label htmlFor="username" className="loginLabel">
								{traduction("Nom d'utilisateur :", "Username:")}
							</label>
							<input
								type="text"
								id="username"
								name="username"
								className={`loginInput ${fieldErr.username ? "error" : ""}`}
								aria-invalid={!!fieldErr.username}
								aria-describedby={
									fieldErr.username ? "err-username" : undefined
								}
								disabled={loading || status === "success"}
							/>
							{fieldErr.username && (
								<p id="err-username" className="fieldError">
									{fieldErr.username}
								</p>
							)}
						</div>
						<div className="loginContainer">
							<label htmlFor="password" className="loginLabel">
								{traduction("Mot de passe :", "Password:")}
							</label>
							<input
								type="password"
								id="password"
								name="password"
								className={`loginInput ${fieldErr.password ? "error" : ""}`}
								aria-invalid={!!fieldErr.password}
								aria-describedby={
									fieldErr.password ? "err-password" : undefined
								}
								disabled={loading || status === "success"}
							/>
							{fieldErr.password && (
								<p id="err-password" className="fieldError">
									{fieldErr.password}
								</p>
							)}
						</div>
						<button
							type="submit"
							className="loginAndsignUpFunctionnal connection"
							disabled={loading || status === "success"}
						>
							{loading ? "..." : "CONNEXION"}
							<Image
								id="loginIcon"
								src="/assets/icons/login.svg"
								alt=""
								width={24}
								height={24}
							/>
						</button>
					</div>
				</form>
				<hr />
				<p id="loginText2">Vous n&#39;avez pas de compte ?</p>
				<button
					type="button"
					className="loginAndsignUpFunctionnal signup"
					onClick={() => {
						effectiveSwitch();
					}}
					disabled={loading || status === "success"}
				>
					INSCRIPTION
					<Image
						id="loginIcon"
						src="/assets/icons/arrow_circle_right_black.svg"
						alt=""
						width={24}
						height={24}
					/>
				</button>
			</section>
		</div>
	);
}
