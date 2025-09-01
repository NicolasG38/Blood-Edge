import usersRepository from "../repository/usersRepository.js";

export const readByPseudo = async (req, res, next) => {
	try {
		const user = await usersRepository.findByPseudo(req.params.pseudo);
		console.log("Pseudo reçu :", req.params.pseudo);
		if (!user) return res.status(404).json({ error: "USER_NOT_FOUND" });
		res.json(user);
	} catch (err) {
		next(err);
	}
};

export default {
	readByPseudo,
};
