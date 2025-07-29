import storesRepository from "../repository/storesRepository.js";

const browse = async (req, res, next) => {
	try {
		const stores = await storesRepository.readAll();
		res.json(stores);
	} catch (error) {
		console.error("Erreur API /api/stores :", error);
		res.status(500).json({ error: error.message });
		next(error); // Affiche l’erreur dans la console serveur
	}
};

export default { browse };
