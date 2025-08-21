import signupRepository from "../repository/signupRepository.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const hashingOptions = {
	type: argon2.argon2id,
	memoryCost: 2 ** 16,
	timeCost: 3,
	parallelism: 1,
};

const browse = async (_req, res) => {
	try {
		const users = (await signupRepository.readAll?.()) || [];
		return res.json(users);
	} catch (e) {
		console.error("[SIGNUP] browse error:", e);
		return res.status(500).json({ error: "INTERNAL_ERROR" });
	}
};

const create = async (req, res) => {
	try {
		const {
			email,
			pseudo,
			password,
			is_accept_cgu = 1,
			type_account = 1,
		} = req.body || {};
		const result = await signupAndAuth({
			email,
			pseudo,
			password,
			is_accept_cgu,
			type_account,
		});
		if (!result.ok) {
			switch (result.code) {
				case "INVALID_PAYLOAD":
				case "WEAK_PASSWORD":
					return res.status(400).json({ error: result.code });
				case "PSEUDO_OR_EMAIL_TAKEN":
					return res.status(409).json({ error: result.code });
				case "CONFIG_ERROR":
					return res.status(500).json({ error: result.code });
				default:
					return res.status(400).json({ error: result.code || "INVALID" });
			}
		}
		res.cookie("token", result.token, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			maxAge: 3600000,
		});
		return res.status(201).json({
			message: "Compte créé et connecté",
			user: result.user,
			token: result.token,
		});
	} catch (error) {
		console.error("Erreur API /api/users (signup):", error);
		return res.status(500).json({ error: "INTERNAL_ERROR" });
	}
};

// Génère maintenant user + token
export async function signupAndAuth({
	email,
	pseudo,
	password,
	is_accept_cgu = 1,
	type_account = 1,
}) {
	if (!email || !pseudo || !password)
		return { ok: false, code: "INVALID_PAYLOAD" };
	if (password.length < 8) return { ok: false, code: "WEAK_PASSWORD" };

	const existing = await signupRepository.findByEmailOrPseudo(email, pseudo);
	if (existing) return { ok: false, code: "PSEUDO_OR_EMAIL_TAKEN" };

	const hashedPassword = await argon2.hash(password, hashingOptions);

	const newUser = await signupRepository.create({
		email,
		pseudo,
		hashedPassword, // adapter si repo attend hashed_password
		is_accept_cgu,
		type_account,
	});

	const secret = process.env.JWT_SECRET;
	if (!secret) return { ok: false, code: "CONFIG_ERROR" };

	const token = jwt.sign(
		{ sub: newUser.User_id, pseudo: newUser.User_pseudo },
		secret,
		{ expiresIn: "1h" },
	);

	return {
		ok: true,
		user: {
			User_id: newUser.User_id,
			User_pseudo: newUser.User_pseudo,
			User_email: newUser.User_email,
		},
		token,
	};
}

export default { browse, create, signupAndAuth };
