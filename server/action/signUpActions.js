import signUpRepository from "../repository/signUpRepository.js";
import argon2 from "argon2";

const hashingPassword = {
	type: argon2.argon2id,
	memoryCost: 2 ** 16,
	timeCost: 3,
	parallelism: 1,
};

const browse = async (req, res, next) => {
	try {
		const signUp = await signUpRepository.readAll();
		res.json(signUp);
	} catch (error) {
		console.error("Erreur API /api/signUp :", error);
		res.status(500).json({ error: error.message });
	}
};

const create = async (req, res) => {
	try {
		const { email, pseudo, password, is_accept_cgu, type_account } = req.body;

		// Vérif unicité
		const existing = await signUpRepository.findByEmailOrPseudo(email, pseudo);
		if (existing) {
			return res
				.status(409)
				.json({ error: "CONFLICT", message: "Email ou pseudo déjà utilisé" });
		}

		// Hash
		const hashed_password = await argon2.hash(password, hashingPassword);

		const newUser = await signUpRepository.create({
			email,
			pseudo,
			hashed_password,
			is_accept_cgu,
			type_account,
		});

		// Jamais renvoyer le hash
		res.status(201).json({
			id: newUser.insertId || newUser.id,
			email,
			pseudo,
		});
	} catch (error) {
		console.error("Erreur API /api/signUp :", error);
		res.status(500).json({ error: "INTERNAL_ERROR" });
	}
};

const messageSuccess = async (formData) => {
	const result = await signUpAction(formData);
	setMessage(result.message);
};

export default { browse, create, messageSuccess };
