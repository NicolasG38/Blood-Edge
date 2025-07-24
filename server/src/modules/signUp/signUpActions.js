import signUpRepository from "./signUpRepository.js";
import argon2 from "argon2";

const hashingpassword = {
	type: argon2.argon2id,
	memoryCost: 5 * 18 ** 5,
	timeCost: 1,
	parallelism: 3,
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

const create = async (req, res, next) => {
	try {
		const hashed_password = await argon2.hash(
			req.body.password,
			hashingpassword,
		);
		req.body.hashed_password = hashed_password;
		const { email, pseudo, is_accept_cgu, type_account } = req.body;
		const newUser = await signUpRepository.create({
			email,
			pseudo,
			hashed_password: req.body.hashed_password,
			is_accept_cgu,
			type_account,
		});
		res.status(201).json(newUser);
	} catch (error) {
		console.error("Erreur API /api/signUp :", error);
		res.status(500).json({ error: error.message });
	}
};

export default { browse, create };
