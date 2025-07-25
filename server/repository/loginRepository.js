import databaseClient from "../database/client.js";

class signUpRepository {
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
}

export default new signUpRepository();
