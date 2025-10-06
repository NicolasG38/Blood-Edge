"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
	userId: number | null;
	pseudo: string | null;
	isLogged: boolean;
	setAuth: React.Dispatch<
		React.SetStateAction<{
			userId: number | null;
			pseudo: string | null;
			isLogged: boolean;
		}>
	>;
	handleLogout?: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
	undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3310";
	const [auth, setAuth] = useState<{
		userId: number | null;
		pseudo: string | null;
		isLogged: boolean;
	}>({
		userId: null,
		pseudo: null,
		isLogged: false,
	});

	useEffect(() => {
		fetch(`${baseURL}/api/me`, { credentials: "include" })
			.then((res) => res.json())
			.then((data) => {
				if (data.user) {
					setAuth({
						userId: data.user.sub ? Number(data.user.sub) : null,
						pseudo: data.user.pseudo ?? null,
						isLogged: true,
					});
				} else {
					setAuth({ userId: null, pseudo: null, isLogged: false });
				}
			});
	}, [baseURL]);

	const router = useRouter();
	const handleLogout = async () => {
		await fetch(`${baseURL}/api/logout`, {
			method: "POST",
			credentials: "include",
		});
		setAuth({ userId: null, pseudo: null, isLogged: false });
		router.push("/");
	};

	return (
		<AuthContext.Provider value={{ ...auth, setAuth, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth doit être utilisé dans <AuthProvider>");
	return ctx;
}
