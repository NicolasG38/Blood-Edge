import databaseClient from "../database/client.js";

class AddFavoriteRepository {
	async addFavorite(userId, nanoSuitId) {
		// Ajout dans la table Favorite
		const [result] = await databaseClient.query(
			"INSERT INTO Favorite (Favorite_user_id, Favorite_NS_id) VALUES (?, ?)",
			[userId, nanoSuitId],
		);
		return result;
	}

	async getFavoritesWithUsers(userId, nanoSuitId) {
		const [rows] = await databaseClient.query(
			`SELECT f.*, u.User_id, n.NS_id
         FROM Favorite f
         JOIN User u ON f.Favorite_user_id = u.User_id
         JOIN Nano_suits n ON f.Favorite_NS_id = n.NS_id
         WHERE f.Favorite_user_id = ? AND f.Favorite_NS_id = ?`,
			[userId, nanoSuitId],
		);
		return rows[0];
	}

	async removeFavorite(userId, nanoSuitId) {
		const [result] = await databaseClient.query(
			"DELETE FROM Favorite WHERE Favorite_user_id = ? AND Favorite_NS_id = ?",
			[userId, nanoSuitId],
		);
		return result;
	}

	async getFavorites(userId) {
		const [rows] = await databaseClient.query(
			"SELECT * FROM Favorite WHERE Favorite_user_id = ?",
			[userId],
		);
		return rows;
	}

	async isFavorite(userId, nanoSuitId) {
		const [rows] = await databaseClient.query(
			"SELECT * FROM Favorite WHERE Favorite_user_id = ? AND Favorite_NS_id = ?",
			[userId, nanoSuitId],
		);
		return rows.length > 0;
	}
}

export default new AddFavoriteRepository();
