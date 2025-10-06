import FavoriteRepository from "../repository/FavoriteRepository.js";

const addFavorite = async (userId, objet_id) => {
	try {
		await FavoriteRepository.addFavorite(userId, objet_id);
		return await FavoriteRepository.getFavoritesWithUsers(userId, objet_id);
	} catch (error) {
		console.error("Erreur lors de l'ajout du favori :", error);
		throw error;
	}
};

const removeFavorite = async (userId, objet_id) => {
	try {
		return await FavoriteRepository.removeFavorite(userId, objet_id);
	} catch (error) {
		console.error("Erreur lors de la suppression du favori :", error);
		throw error;
	}
};

const isFavorite = async (userId, objet_id) => {
	return await FavoriteRepository.isFavorite(userId, objet_id);
};

const getUserFavorites = async (userId) => {
	return await FavoriteRepository.getUserFavorites(userId);
};

export default { addFavorite, removeFavorite, isFavorite, getUserFavorites };
