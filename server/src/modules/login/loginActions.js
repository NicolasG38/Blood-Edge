import loginRepository from "./loginRepository.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const login = async (req, res, next) => {
	try {
		const user = await loginRepository.readPseudo(req.body.pseudo);
		if (!user) {
			return res.status(401).json({ error: "Identifiants incorrects" });
		}
		const isPasswordValid = await argon2.verify(
			user.User_hashed_password,
			req.body.password,
		);
		if (!isPasswordValid) {
			return res.status(401).json({ error: "Identifiants incorrects" });
		}
		// Génération du token JWT
		const token = jwt.sign(
			{ sub: user.User_id }, // ou { id: user.User_id, pseudo: user.User_pseudo }
			process.env.JWT_SECRET,
			{ expiresIn: "1h" },
		);
		// Renvoie le token et l'utilisateur au client
		res.json({ user, token });
	} catch (error) {
		console.error("Erreur API /api/login :", error);
		res.status(500).json({ error: error.message });
	}
};

export default { login };
