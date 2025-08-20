import databaseClient from "../database/client.js";

class StatsEVERepository {
	async browse() {
		const [rows] = await databaseClient.query("SELECT * FROM StatsEVE");
		return rows;
	}
}

export default new StatsEVERepository();
