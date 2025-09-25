import loginRepository from "../repository/loginRepository.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
	try {
		const { pseudo, password } = req.body || {};
		if (!pseudo || !password) {
			return res.status(400).json({ error: "Requête invalide" });
		}

		if (!process.env.JWT_SECRET) {
			console.error("JWT_SECRET manquant");
			return res.status(500).json({ error: "CONFIG_ERROR" });
		}

		const user = await loginRepository.readPseudo(pseudo);
		if (!user) {
			return res
				.status(401)
				.json({ error: "Identifiants/Mot de passe incorrects" });
		}

		const isPasswordValid = await argon2.verify(
			user.User_hashed_password,
			password,
		);
		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ error: "Identifiants/Mot de passe incorrects" });
		}

		const token = jwt.sign(
			{
				sub: user.User_id,
				pseudo: user.User_pseudo,
				role: user.User_role || "user",
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" },
		);

		res.cookie("userId", user.User_id, {
			httpOnly: false, // false pour pouvoir le lire côté client si besoin
			sameSite: "lax",
			secure: false, // true en prod HTTPS
			path: "/",
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.cookie("pseudo", user.User_pseudo, {
			httpOnly: false,
			sameSite: "lax",
			secure: false,
			path: "/",
			maxAge: 24 * 60 * 60 * 1000,
		});

		// Stocke le token dans un cookie sécurisé
		res.cookie("token", token, {
			httpOnly: true,
			secure: false, // true en prod, false en dev
			sameSite: "strict",
			path: "/",
			maxAge: 24 * 60 * 60 * 1000, // 1 jour
		});

		// Tu peux aussi renvoyer des infos utiles au client
		return res.json({
			success: true,
			user: {
				User_id: user.User_id,
				User_pseudo: user.User_pseudo,
				User_role: user.User_role || "user",
			},
			token,
			message: "Bon retour ! Ton Tetrapod est prêt !",
		});
	} catch (error) {
		console.error("Erreur API /api/login :", error);
		return res.status(500).json({ error: "INTERNAL_ERROR" });
	}
};

const logout = (req, res) => {
	req.session.destroy();
	res.clearCookie("token", {
		httpOnly: true,
		secure: false,
		sameSite: "strict",
		path: "/",
		expires: new Date(0),
	});
	res.clearCookie("userId", {
		httpOnly: false,
		sameSite: "lax",
		secure: false,
		path: "/",
	});
	res.clearCookie("pseudo", {
		httpOnly: false,
		sameSite: "lax",
		secure: false,
		path: "/",
	});
	return res.json({ success: true, message: "Déconnexion réussie" });
};

export default { login, logout };
