import AddFavoriteRepository from "./AddFavoriteRepository.js";

const addFavorite = async (userId, nanoSuitId) => {
	try {
		// Ajout d'une Nano-combi aux favoris de l'utilisateur
		const result = await AddFavoriteRepository.addFavorite(userId, nanoSuitId);
		return result;
	} catch (error) {
		console.error("Erreur lors de l'ajout du favori :", error);
		throw error;
	}
};

const removeFavorite = async (userId, nanoSuitId) => {
	try {
		const result = await AddFavoriteRepository.removeFavorite(
			userId,
			nanoSuitId,
		);
		return result;
	} catch (error) {
		console.error("Erreur lors de la suppression du favori :", error);
		throw error;
	}
};

export default { addFavorite, removeFavorite };
