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
			"SELECT Equipment_id, Equipment_star_1, Equipment_star_2, Equipment_star_3, Equipment_title_fr, Equipment_title_en, Equipment_star, Equipment_star_fill, Equipment_icon, Equipment_icon_colored, Equipment_icon_Mk2, Equipment_icon_Mk2_colored FROM Equipment",
		);
		return rows;
	}
}

export default new EquipmentRepository();
