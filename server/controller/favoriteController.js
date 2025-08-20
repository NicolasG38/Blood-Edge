import favoriteActions from "../action/favoriteActions.js";

const pickOne = ({ exo, equip, ns }) => {
	const toId = (v) =>
		v !== undefined && v !== null && v !== "" ? Number(v) : null;
	if (toId(exo)) return { type: "exospine", targetId: toId(exo) };
	if (toId(equip)) return { type: "equipment", targetId: toId(equip) };
	if (toId(ns)) return { type: "ns", targetId: toId(ns) };
	return null;
};

const addFavorite = async (req, res) => {
	const { userId, exo, equip, ns } = req.body;
	const pick = pickOne({ exo, equip, ns });
	if (!userId || !pick)
		return res.status(400).json({ error: "Paramètres invalides" });
	try {
		const result = await favoriteActions.addFavorite(
			Number(userId),
			pick.targetId,
			pick.type,
		);
		res.json(result);
	} catch (error) {
		console.error("[addFavorite]", error);
		res.status(500).json({ error: "Erreur lors de l'ajout du favori" });
	}
};

const removeFavorite = async (req, res) => {
	const { userId, exo, equip, ns } = req.body;
	const pick = pickOne({ exo, equip, ns });
	if (!userId || !pick)
		return res.status(400).json({ error: "Paramètres invalides" });
	try {
		const result = await favoriteActions.removeFavorite(
			Number(userId),
			pick.targetId,
			pick.type,
		);
		res.json(result);
	} catch (error) {
		console.error("[removeFavorite]", error);
		res.status(500).json({ error: "Erreur lors de la suppression du favori" });
	}
};

const isFavorite = async (req, res) => {
	const { userId, exo, equip, ns } = req.body;
	const pick = pickOne({ exo, equip, ns });
	if (!userId || !pick)
		return res.status(400).json({ error: "Paramètres invalides" });
	try {
		const result = await favoriteActions.isFavorite(
			Number(userId),
			pick.targetId,
			pick.type,
		);
		res.json({ isFavorite: result });
	} catch (error) {
		console.error("[isFavorite]", error);
		res.status(500).json({ error: "Erreur lors de la vérification du favori" });
	}
};

export default { addFavorite, removeFavorite, isFavorite };
