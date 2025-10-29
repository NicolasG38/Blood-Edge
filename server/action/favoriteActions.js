import FavoriteRepository from "../repository/FavoriteRepository.js";

const addFavorite = async (userId, objet_id) => {
	try {
		await FavoriteRepository.addFavorite(userId, objet_id);
		const result = await FavoriteRepository.getFavoritesWithUsers(
			userId,
			objet_id,
		);

		// Filtrer les infos sensibles avant de retourner
		const safeResult = result.map((fav) => ({
			favoriteId: fav.Favorite_id,
			objetId: fav.Favorite_objet_id_fk,
			userId: fav.Favorite_users_id,
			pseudo: fav.Users_pseudo,
		}));

		return safeResult;
	} catch (error) {
		console.error("Erreur lors de l'ajout du favori :", error);
		throw error;
	}
};

const removeFavorite = async (userId, objet_id) => {
	try {
		const result = await FavoriteRepository.removeFavorite(userId, objet_id);

		// Filtrer les infos sensibles avant de retourner
		const safeResult = Array.isArray(result)
			? result.map((fav) => ({
					favoriteId: fav.Favorite_id,
					objetId: fav.Favorite_objet_id_fk,
					userId: fav.Favorite_users_id,
					pseudo: fav.Users_pseudo,
				}))
			: {
					favoriteId: result?.Favorite_id,
					objetId: result?.Favorite_objet_id_fk,
					userId: result?.Favorite_users_id,
					pseudo: result?.Users_pseudo,
				};

		return safeResult;
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
