import favoriteActions from "../action/favoriteActions.js";

const addFavorite = async (req, res) => {
	const { userId, nanoSuitId } = req.body;
	try {
		const result = await favoriteActions.addFavorite(userId, nanoSuitId);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: "Erreur lors de l'ajout du favori" });
	}
};

const removeFavorite = async (req, res) => {
	const { userId, nanoSuitId } = req.body;
	try {
		const result = await favoriteActions.removeFavorite(userId, nanoSuitId);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: "Erreur lors de la suppression du favori" });
	}
};

const isFavorite = async (req, res) => {
	const { userId, nanoSuitId } = req.body;
	try {
		const result = await favoriteActions.isFavorite(userId, nanoSuitId);
		res.json({ isFavorite: result });
	} catch (error) {
		res.status(500).json({ error: "Erreur lors de la vérification du favori" });
	}
};

export default { addFavorite, removeFavorite, isFavorite };
