import FavoriteRepository from "../repository/FavoriteRepository.js"; // corrige la casse

const addFavorite = async (userId, nanoSuitId) => {
	try {
		// Ajout d'une Nano-combi aux favoris de l'utilisateur
		await FavoriteRepository.addFavorite(userId, nanoSuitId);
		return await FavoriteRepository.getFavoritesWithUsers(userId, nanoSuitId);
	} catch (error) {
		console.error("Erreur lors de l'ajout du favori :", error);
		throw error;
	}
};

const removeFavorite = async (userId, nanoSuitId) => {
	try {
		const result = await FavoriteRepository.removeFavorite(userId, nanoSuitId);
		return result;
	} catch (error) {
		console.error("Erreur lors de la suppression du favori :", error);
		throw error;
	}
};

const isFavorite = async (userId, nanoSuitId) => {
	try {
		return await FavoriteRepository.isFavorite(userId, nanoSuitId);
	} catch (error) {
		console.error("Erreur lors de la vérification du favori :", error);
		throw error;
	}
};
export default { addFavorite, removeFavorite, isFavorite };
