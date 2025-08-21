import { path } from "motion/react-client";
import { authenticate } from "../action/loginAction.js";

export async function login(req, res) {
	const commit = req.query.commit === "1"; // optionnel
	const { pseudo, password } = req.body || {};

	if (!pseudo || !password) {
		return res.status(400).json({ error: "Requête invalide" });
	}

	try {
		const result = await authenticate(pseudo, password);

		if (!result.ok) {
			if (result.code === "BAD_CREDENTIALS")
				return res
					.status(401)
					.json({ error: "Identifiants/Mot de passe incorrects" });
			if (result.code === "CONFIG_ERROR")
				return res.status(500).json({ error: "CONFIG_ERROR" });
			return res.status(500).json({ error: "INTERNAL_ERROR" });
		}

		if (!commit) {
			// Pré‑validation (si tu utilises un flux en deux temps)
			return res.json({ pending: true });
		}
		res.cookie("userId", user.User_id, {
			httpOnly: false, // false pour pouvoir le lire côté client si besoin
			sameSite: "lax",
			secure: false, // true en prod HTTPS
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.cookie("pseudo", user.User_pseudo, {
			httpOnly: false,
			sameSite: "lax",
			secure: false,
			path: "/",
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.cookie("token", result.token, {
			httpOnly: true,
			sameSite: "lax",
			maxAge: 3600000,
		});

		return res.json({
			user: result.user,
			token: result.token,
			message: "Connexion réussie",
		});
	} catch (e) {
		console.error("LOGIN ERROR:", e);
		return res.status(500).json({ error: "INTERNAL_ERROR" });
	}
}
