import nanoSuitsRepository from "./nanoSuitsRepository.js";

const browse = async (req, res, next) => {
	try {
		const nanoSuits = await nanoSuitsRepository.readAll();
		res.json(nanoSuits);
	} catch (error) {
		console.error("Erreur API /api/nanosuits :", error);
		res.status(500).json({ error: error.message });
		next(error); // Affiche l’erreur dans la console serveur
	}
};

export default { browse };
