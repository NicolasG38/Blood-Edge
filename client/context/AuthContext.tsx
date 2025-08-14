"use client";
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthState {
	token: string | null;
	userId: string | null;
	pseudo: string | null;
}

interface AuthContextValue {
	auth: AuthState;
	setAuth: (a: AuthState) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [auth, setAuth] = useState<AuthState>({
		token: null,
		userId: null,
		pseudo: null,
	});

	useEffect(() => {
		const token = localStorage.getItem("token");
		const userId = localStorage.getItem("userId");
		const pseudo = localStorage.getItem("pseudoStorage");
		if (token || userId || pseudo) {
			setAuth({ token, userId, pseudo });
		}
	}, []);

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
		localStorage.removeItem("pseudoStorage");
		setAuth({ token: null, userId: null, pseudo: null });
	};

	return (
		<AuthContext.Provider value={{ auth, setAuth, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth doit être utilisé dans <AuthProvider>");
	return ctx;
}
