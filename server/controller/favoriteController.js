import favoriteActions from "../action/favoriteActions.js";

const addFavorite = async (req, res) => {
	const { userId, objet_id } = req.body;
	const userIdNum = Number(userId);
	const objetIdNum = Number(objet_id);
	if (!userIdNum || !objetIdNum)
		return res.status(400).json({ error: "Paramètres invalides" });
	try {
		const result = await favoriteActions.addFavorite(
			Number(userId),
			Number(objet_id),
		);
		res.json(result);
	} catch (error) {
		console.error("[addFavorite]", error);
		res.status(500).json({ error: "Erreur lors de l'ajout du favori" });
	}
};

const removeFavorite = async (req, res) => {
	const { userId, objet_id } = req.body;
	const userIdNum = Number(userId);
	const objetIdNum = Number(objet_id);
	if (!userIdNum || !objetIdNum)
		return res.status(400).json({ error: "Paramètres invalides" });
	try {
		const result = await favoriteActions.removeFavorite(
			Number(userId),
			objet_id,
		);
		res.json(result);
	} catch (error) {
		console.error("[removeFavorite]", error);
		res.status(500).json({ error: "Erreur lors de la suppression du favori" });
	}
};

const isFavorite = async (req, res) => {
	const { userId, objet_id } = req.body;
	const userIdNum = Number(userId);
	const objetIdNum = Number(objet_id);
	if (!userIdNum || !objetIdNum)
		return res.status(400).json({ error: "Paramètres invalides" });
	try {
		const result = await favoriteActions.isFavorite(Number(userId), objet_id);

		res.json({ isFavorite: result });
	} catch (error) {
		console.error("[isFavorite]", error);
		res.status(500).json({ error: "Erreur lors de la vérification du favori" });
	}
};

const getUserFavorites = async (req, res) => {
	const { pseudo } = req.params;
	if (!pseudo) return res.status(400).json({ error: "Paramètres invalides" });
	try {
		const usersRepository = await import("../repository/usersRepository.js");
		const user = await usersRepository.default.findByPseudo(pseudo);
		if (!user || !user.Users_id) {
			return res.status(404).json({ error: "Utilisateur non trouvé" });
		}
		const result = await favoriteActions.getUserFavorites(user.Users_id);
		res.json(result);
	} catch (error) {
		console.error("[getUserFavorites]", error);
		res
			.status(500)
			.json({ error: "Erreur lors de la récupération des favoris" });
	}
};

export default { addFavorite, removeFavorite, isFavorite, getUserFavorites };
