import databaseClient from "../database/client.js";

class locations {
	async readAll() {
		const [rows] = await databaseClient.query("SELECT * FROM locations");
		return rows;
	}
}

export default new locations();
