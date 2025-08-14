import databaseClient from "../database/client.js";

class SignUpRepository {
	async create({
		email,
		pseudo,
		hashedPassword,
		is_accept_cgu = 1,
		type_account = 1,
	}) {
		const [result] = await databaseClient.query(
			`INSERT INTO User (User_email, User_pseudo, User_hashed_password, User_is_accept_cgu, User_Type_account)
             VALUES (?, ?, ?, ?, ?)`,
			[email, pseudo, hashedPassword, is_accept_cgu, type_account],
		);
		return {
			User_id: result.insertId,
			User_pseudo: pseudo,
			User_email: email,
		};
	}

	// Ancienne version (si encore appelée) -> redirige vers create
	async createRaw(args) {
		return this.create(args);
	}

	async readAll() {
		const [rows] = await databaseClient.query(
			"SELECT User_id, User_email, User_pseudo FROM User",
		);
		return rows;
	}
	async findByEmailOrPseudo(email, pseudo) {
		const [rows] = await databaseClient.query(
			"SELECT User_id, User_email, User_pseudo, User_hashed_password FROM User WHERE User_email = ? OR User_pseudo = ? LIMIT 1",
			[email, pseudo],
		);
		return rows[0] || null;
	}

	async findByPseudo(pseudo) {
		const [rows] = await databaseClient.query(
			"SELECT User_id, User_pseudo, User_hashed_password, User_role FROM User WHERE User_pseudo = ? LIMIT 1",
			[pseudo],
		);
		return rows[0] || null;
	}
}

export default new SignUpRepository();

// RECOMMANDÉ : renommer ce fichier en signupRepository.js
// puis mettre à jour tous les imports : import signupRepository from "../repository/signupRepository.js";
