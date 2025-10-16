import usersRepository from "../repository/usersRepository.js";

function timeSinceSignup(signupDate) {
	const now = new Date();
	const date = new Date(signupDate);
	const diffMs = now - date;
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
	const diffMonths = Math.floor(diffDays / 30.44);
	const diffYears = Math.floor(diffDays / 365.25);
	if (diffYears >= 1) {
		return `${diffYears} an${diffYears > 1 ? "s" : ""}`;
	}
	if (diffMonths >= 1) {
		return `${diffMonths} mois`;
	}
	return `${diffDays} jour${diffDays > 1 ? "s" : ""}`;
}

export const readByPseudo = async (req, res, next) => {
	try {
		const user = await usersRepository.findByPseudo(req.params?.pseudo);
		if (!user) return res.status(404).json({ error: "USER_NOT_FOUND" });
		// Ajout du calcul du temps depuis l'inscription
		let inscriptionDuration = null;
		if (user?.Users_created_at) {
			inscriptionDuration = timeSinceSignup(user.Users_created_at);
		}
		res.json({
			...user,
			inscriptionDuration,
		});
	} catch (err) {
		next(err);
	}
};

export default {
	readByPseudo,
};
