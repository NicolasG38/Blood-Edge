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

		return res.json({
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

export default { login };
