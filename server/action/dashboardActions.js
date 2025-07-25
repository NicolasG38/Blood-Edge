import AddFavoriteRepository from "../repository/FavoriteRepository.js";

const dashboardActions = {
	browse: async (req, res) => {
		try {
			const userId = req.body.userId;
			const favorites = await AddFavoriteRepository.getFavorites(userId);
			res.json(favorites);
		} catch (error) {
			res.status(500).json({ error: "Erreur dashboard" });
		}
	},
};

export default dashboardActions;
