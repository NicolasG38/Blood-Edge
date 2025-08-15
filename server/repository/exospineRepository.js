import databaseClient from "../database/client.js";

class ExospineRepository {
	async read(id) {
		const [rows] = await databaseClient.query(
			"SELECT * FROM Exospine WHERE Exospine_id = ?",
			[id],
		);
		return rows[0] ?? null;
	}

	async readAll() {
		const [rows] = await databaseClient.query("SELECT * FROM Exospine");
		return rows;
	}

	async getIdAndTitle() {
		const [rows] = await databaseClient.query(
			"SELECT Exospine_id, Exospine_title_fr, Exospine_title_en, Exospine_icon, Exospine_icon_colored, Exospine_icon_Mk2, Exospine_icon_Mk2_colored FROM Exospine",
		);
		return rows;
	}

	async create(data) {
		const [result] = await databaseClient.query("INSERT INTO Exospine SET ?", [
			data,
		]);
		return { Exospine_id: result.insertId, ...data };
	}

	async update(id, data) {
		const [result] = await databaseClient.query(
			"UPDATE Exospine SET ? WHERE Exospine_id = ?",
			[data, id],
		);
		if (result.affectedRows === 0) return null;
		return { Exospine_id: id, ...data };
	}

	async delete(id) {
		const [result] = await databaseClient.query(
			"DELETE FROM Exospine WHERE Exospine_id = ?",
			[id],
		);
		return result.affectedRows > 0;
	}
}

export default new ExospineRepository();
