"use client";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import type { Payload } from "./Login"; // type only

export default function AuthShell() {
	const [mode, setMode] = useState<"login" | "signup">("login");

	return mode === "login" ? (
		<Login
			onSuccess={(p: Payload) => console.info("SUCCESS", p)}
			onSwitch={() => setMode("signup")}
		/>
	) : (
		<Signup onSwitch={() => setMode("login")} />
	);
}
