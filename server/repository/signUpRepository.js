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
			`INSERT INTO Users (Users_email, Users_pseudo, Users_hashed_password, Users_is_accept_cgu, Users_Type_account)
             VALUES (?, ?, ?, ?, ?)`,
			[email, pseudo, hashedPassword, is_accept_cgu, type_account],
		);
		return {
			Users_id: result.insertId,
			Users_pseudo: pseudo,
			Users_email: email,
		};
	}

	// Ancienne version (si encore appelée) -> redirige vers create
	async createRaw(args) {
		return this.create(args);
	}

	async readAll() {
		const [rows] = await databaseClient.query(
			"SELECT Users_id, Users_email, Users_pseudo FROM Users",
		);
		return rows;
	}
	async findByEmailOrPseudo(email, pseudo) {
		const [rows] = await databaseClient.query(
			"SELECT Users_id, Users_email, Users_pseudo, Users_hashed_password FROM Users WHERE Users_email = ? OR Users_pseudo = ? LIMIT 1",
			[email, pseudo],
		);
		return rows[0] || null;
	}

	async findByPseudo(pseudo) {
		const [rows] = await databaseClient.query(
			"SELECT Users_id, Users_pseudo, Users_hashed_password, Users_role FROM Users WHERE Users_pseudo = ? LIMIT 1",
			[pseudo],
		);
		return rows[0] || null;
	}
}

export default new SignUpRepository();

// RECOMMANDÉ : renommer ce fichier en signupRepository.js
// puis mettre à jour tous les imports : import signupRepository from "../repository/signupRepository.js";
