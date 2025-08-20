import databaseClient from "../database/client.js";

function colFor(type) {
	if (type === "exospine" || type === "exo") return "Favorite_exospine_id";
	if (type === "equipment" || type === "equip") return "Favorite_equipment_id";
	if (type === "ns") return "Favorite_NS_id";
	throw new Error("type invalide");
}

function normalizeType(type) {
	if (type === "exo") return "exospine";
	if (type === "equip") return "equipment";
	return type;
}

class FavoriteRepository {
	async addFavorite(userId, targetId, type) {
		const normalizedType = normalizeType(type);

		const sql = `
      INSERT INTO Favorite (Favorite_user_id, Favorite_exospine_id, Favorite_equipment_id, Favorite_NS_id)
      VALUES (?, ?, ?, ?)
    `;

		const values = [
			userId,
			normalizedType === "exospine" ? targetId : null,
			normalizedType === "equipment" ? targetId : null,
			normalizedType === "ns" ? targetId : null,
		];
		const result = await databaseClient.query(sql, values);

		// Utilise normalizedType ici aussi !
		return await this.getFavoritesWithUsers(userId, normalizedType, targetId);
	}

	async removeFavorite(userId, targetId, type) {
		const normalizedType = normalizeType(type);
		const col = colFor(normalizedType);
		const sql = `DELETE FROM Favorite WHERE Favorite_user_id = ? AND ${col} = ?`;
		const [result] = await databaseClient.query(sql, [userId, targetId]);
		return result;
	}

	async getFavorites(userId) {
		const [rows] = await databaseClient.query(
			"SELECT * FROM Favorite WHERE Favorite_user_id = ?",
			[userId],
		);
		return rows;
	}

	async isFavorite(userId, type, targetId) {
		const normalizedType =
			type === "exo" ? "exospine" : type === "equip" ? "equipment" : type;
		const col = colFor(normalizedType);
		const sql = `SELECT 1 FROM Favorite WHERE Favorite_user_id = ? AND ${col} = ? LIMIT 1`;
		const [rows] = await databaseClient.query(sql, [userId, targetId]);
		return rows.length > 0;
	}

	async getFavoritesWithUsers(userId, type, targetId) {
		const normalizedType = normalizeType(type);
		const cfg = {
			ns: { col: "Favorite_NS_id", table: "Nano_suits", pk: "NS_id" },
			exospine: {
				col: "Favorite_exospine_id",
				table: "Exospine",
				pk: "Exospine_id",
			},
			equipment: {
				col: "Favorite_equipment_id",
				table: "Equipment",
				pk: "Equipment_id",
			},
		}[normalizedType];
		if (!cfg) throw new Error("type invalide");

		const sql = `
      SELECT
        f.Favorite_id,
        f.Favorite_user_id,
        f.${cfg.col} AS target_id,
        '${normalizedType}'     AS type,
        u.User_id,
        t.${cfg.pk}   AS id
      FROM Favorite f
      JOIN \`User\` u ON u.User_id = f.Favorite_user_id
      JOIN ${cfg.table} t ON t.${cfg.pk} = f.${cfg.col}
      WHERE f.Favorite_user_id = ? AND f.${cfg.col} = ?
    `;
		const [rows] = await databaseClient.query(sql, [userId, targetId]);
		return rows[0] ?? null;
	}
}

export default new FavoriteRepository();
