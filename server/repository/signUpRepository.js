import databaseClient from "../database/client.js";

class signUpRepository {
	async create({
		email,
		pseudo,
		hashed_password,
		is_accept_cgu,
		type_account,
	}) {
		// Execute the SQL SELECT query to retrieve a specific signUp by its ID
		const [rows] = await databaseClient.query(
			"INSERT INTO User (User_email, User_pseudo, User_hashed_password, User_is_accept_cgu, User_Type_account) VALUES (?, ?, ?, ?, ?)",
			[email, pseudo, hashed_password, is_accept_cgu, type_account],
		);
		return rows;
	}
	async readAll() {
		const [rows] = await databaseClient.query("SELECT * FROM User");
		return rows;
	}
	async findByEmailOrPseudo(email, pseudo) {
		const [rows] = await databaseClient.query(
			"SELECT User_id, User_email, User_pseudo FROM User WHERE User_email = ? OR User_pseudo = ? LIMIT 1",
			[email, pseudo],
		);
		return rows[0] || null;
	}
}

export default new signUpRepository();
