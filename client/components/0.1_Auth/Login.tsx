"use client";
import "./Login.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Signup from "./Signup";

export type Payload = {
	token: string;
	user: {
		User_id: string | number;
		User_pseudo: string;
	};
};

type LoginProps = {
	onSuccess?: (payload: Payload) => void; // changé
	onSwitch?: () => void;
	setOpenLogin?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({
	onSuccess,
	onSwitch,
	setOpenLogin,
}: LoginProps) {
	const baseURL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

	const router = useRouter();
	const { setAuth } = useAuth();
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
	const [message, setMessage] = useState<string | null>(null);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFail, setShowFail] = useState(false);
	const [internalMode, setInternalMode] = useState<"login" | "signup">("login");
	const [isMobile, setIsMobile] = useState(false);

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

		const form = new FormData(event.currentTarget);
		const payload = {
			pseudo: (form.get("username") as string)?.trim(),
			password: form.get("password") as string,
		};

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
					User_pseudo: string;
					User_id: string;
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
				localStorage.setItem("pseudoStorage", data.user.User_pseudo);

				const payload: Payload = {
					token: data.token,
					user: {
						User_id: data.user.User_id,
						User_pseudo: data.user.User_pseudo,
					},
				};

				setStatus("success");
				setMessage(data?.message || "Connexion réussie");

				setShowSuccess(true);
				setShowFail(false);

				setTimeout(() => {
					onSuccess?.(payload);
					setAuth({
						userId: data.user?.User_id ?? "",
						pseudo: data.user?.User_pseudo ?? "",
						isLogged: true,
					});
					if (!isMobile) {
						window.location.reload();
					} else {
						router.push(`/dashboard/${data.user?.User_pseudo ?? ""}`);
					}
				}, 2000);
			} else {
				const msg =
					data?.message ||
					data?.error ||
					(!response.ok && `Erreur ${response.status}`) ||
					"Identifiants/Mot de passe incorrects";
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
						<h1 id="loginTitle">CONNEXION</h1>
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
							disabled={loading || status === "success"}
						/>
						<label htmlFor="password" className="loginLabel">
							Mot de passe :
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="loginInput"
							disabled={loading || status === "success"}
						/>
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
				<p id="loginText2">Vous n'avez pas de compte ?</p>
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
