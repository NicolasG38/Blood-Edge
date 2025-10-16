import databaseClient from "../database/client.js";

class FavoriteRepository {
	async addFavorite(userId, objetId) {
		const sql = `
            INSERT INTO Favorite (Favorite_users_id, Favorite_objet_id_fk)
            VALUES (?, ?)
        `;
		await databaseClient.query(sql, [userId, objetId]);
		return await this.getFavorites(userId);
	}

	async removeFavorite(userId, objetId) {
		const sql = `
            DELETE FROM Favorite
            WHERE Favorite_users_id = ? AND Favorite_objet_id_fk = ?
        `;
		const [result] = await databaseClient.query(sql, [userId, objetId]);
		console.log("Résultat de la suppression du favori :", result);
		return result;
	}

	async isFavorite(userId, objetId) {
		const sql = `
            SELECT 1 FROM Favorite
            WHERE Favorite_users_id = ? AND Favorite_objet_id_fk = ? LIMIT 1
        `;
		const [rows] = await databaseClient.query(sql, [userId, objetId]);
		return rows.length > 0;
	}

	async getFavorites(userId) {
		const [rows] = await databaseClient.query(
			"SELECT * FROM Favorite WHERE Favorite_users_id = ?",
			[userId],
		);
		return rows;
	}

	async getUserFavorites(userId) {
		const sql = `
        SELECT
            f.Favorite_id,
            f.Favorite_users_id,
            f.Favorite_objet_id_fk,
            o.Objet_id,
            o.Objet_arsenal_id_fk,
            o.Objet_type_id_fk,
            t.TypeObjet_name,
            a.Arsenal_title
        FROM Favorite f
        JOIN Users u ON u.Users_id = f.Favorite_users_id
        JOIN Objet o ON o.Objet_id = f.Favorite_objet_id_fk
        JOIN TypeObjet t ON t.TypeObjet_id = o.Objet_type_id_fk
        JOIN Arsenal a ON a.Arsenal_id = o.Objet_arsenal_id_fk
        WHERE u.Users_id = ?
    `;
		const [rows] = await databaseClient.query(sql, [userId]);
		return rows;
	}

	async getFavoritesWithUsers(userId, objetId) {
		const sql = `
        SELECT f.*, u.*, o.*
        FROM Favorite f
        JOIN Users u ON f.Favorite_users_id = u.Users_id
        JOIN Objet o ON f.Favorite_objet_id_fk = o.Objet_id
        WHERE f.Favorite_users_id = ? AND f.Favorite_objet_id_fk = ?
    `;
		const [rows] = await databaseClient.query(sql, [userId, objetId]);
		return rows;
	}

	async findByPseudo(pseudo) {
		const [rows] = await databaseClient.query(
			"SELECT * FROM Users WHERE Users_pseudo = ?",
			[pseudo],
		);
		return rows[0];
	}
}

export default new FavoriteRepository();
