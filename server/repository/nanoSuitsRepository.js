import databaseClient from "../database/client.js";

class NanoSuitsRepository {
	async read(id) {
		// Execute the SQL SELECT query to retrieve a specific Nano_suit by its ID
		const [rows] = await databaseClient.query(
			"select * from Nano_suits where NS_id = ?",
			[id],
		);
		return rows;
	}
	async readAll() {
		const [rows] = await databaseClient.query("SELECT * FROM Nano_suits");
		return rows;
	}
	async getIdAndTitle() {
		const [rows] = await databaseClient.query(
			"SELECT NS_title, NS_id AS id FROM Nano_suits",
		);
		return rows;
	}
}

export default new NanoSuitsRepository();
