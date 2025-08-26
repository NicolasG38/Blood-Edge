import databaseClient from "../database/client.js";

class EquipmentRepository {
	async read(id) {
		const [rows] = await databaseClient.query(
			"SELECT * FROM Equipment WHERE Equipment_id = ?",
			[id],
		);
		return rows[0];
	}
	async readAll() {
		const [rows] = await databaseClient.query("SELECT * FROM Equipment");
		return rows;
	}
	async getIdAndTitle() {
		const [rows] = await databaseClient.query(
			"SELECT Equipment_id, Equipment_title_fr FROM Equipment",
		);
		return rows;
	}
}

export default new EquipmentRepository();
