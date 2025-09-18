import FavoriteRepository from "../repository/FavoriteRepository.js";

function resolveType(exo, equip, ns) {
	const toId = (v) =>
		v === undefined || v === null || v === "" ? null : Number(v);
	const ids = {
		exo: toId(exo),
		equip: toId(equip),
		ns: toId(ns),
	};
	const entries = Object.entries(ids).filter(([, v]) => Number.isFinite(v));
	if (entries.length !== 1) {
		throw new Error("Un et un seul targetId doit être fourni (exo/equip/ns).");
	}
	const [type, targetId] = entries[0];
	return { type, targetId };
}

const addFavorite = async (userId, targetId, type) => {
	try {
		await FavoriteRepository.addFavorite(userId, targetId, type);
		return await FavoriteRepository.getFavoritesWithUsers(
			userId,
			type,
			targetId,
		);
	} catch (error) {
		console.error("Erreur lors de l'ajout du favori :", error);
		throw error;
	}
};

const removeFavorite = async (userId, targetId, type) => {
	try {
		return await FavoriteRepository.removeFavorite(userId, targetId, type);
	} catch (error) {
		console.error("Erreur lors de la suppression du favori :", error);
		throw error;
	}
};

const isFavorite = async (userId, targetId, type) => {
	return await FavoriteRepository.isFavorite(userId, type, targetId);
};

const getUserFavorites = async (pseudo) => {
	return await FavoriteRepository.getUserFavorites(pseudo);
};

export default { addFavorite, removeFavorite, isFavorite, getUserFavorites };
