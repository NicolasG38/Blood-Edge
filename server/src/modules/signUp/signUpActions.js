import signUpRepository from "./signUpRepository.js";

const browse = async (req, res, next) => {
	try {
		const signUp = await signUpRepository.readAll();
		res.json(signUp);
	} catch (error) {
		console.error("Erreur API /api/signUp :", error);
		res.status(500).json({ error: error.message });
		next(error); // Affiche l’erreur dans la console serveur
	}
};

const create = async (req, res, next) => {
	try {
		const { email, pseudo, hashed_password, is_accept_cgu, type_account } =
			req.body;
		const newUser = await signUpRepository.create({
			email,
			pseudo,
			hashed_password,
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
