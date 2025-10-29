import databaseClient from "../database/client.js";

class loginRepository {
	async readUser(pseudo, hashed_password) {
		const [rows] = await databaseClient.query(
			"SELECT * FROM Users WHERE Users_pseudo = ? AND Users_hashed_password = ?",
			[pseudo, hashed_password],
		);
		return rows;
	}

	async readPseudo(pseudo) {
		const [rows] = await databaseClient.query(
			"SELECT * FROM Users WHERE Users_pseudo = ?",
			[pseudo],
		);
		return rows[0];
	}

	async findUserByPseudo(pseudo) {
		const [rows] = await databaseClient.query(
			"SELECT Users_id, Users_pseudo, Users_hashed_password FROM Users WHERE Users_pseudo = ? LIMIT 1",
			[pseudo],
		);
		return rows[0] || null;
	}
}

export default new loginRepository();
