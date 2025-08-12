import databaseClient from "../database/client.js";

class loginRepository {
	async readUser(pseudo, hashed_password) {
		const [rows] = await databaseClient.query(
			"SELECT * FROM User WHERE User_pseudo = ? AND User_hashed_password = ?",
			[pseudo, hashed_password],
		);
		return rows;
	}

	async readPseudo(pseudo) {
		const [rows] = await databaseClient.query(
			"SELECT * FROM User WHERE User_pseudo = ?",
			[pseudo],
		);
		return rows[0];
	}

	async findUserByPseudo(pseudo) {
		const [rows] = await databaseClient.query(
			"SELECT id AS User_id, pseudo AS User_pseudo, hashed_password FROM users WHERE pseudo = ? LIMIT 1",
			[pseudo],
		);
		return rows[0] || null;
	}
}

export default new loginRepository();
