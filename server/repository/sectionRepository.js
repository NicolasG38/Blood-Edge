import databaseClient from "../database/client.js";

class sectionRepository {
	async readAll() {
		const [rows] = await databaseClient.query("SELECT * FROM Section");
		return rows;
	}
}

export default new sectionRepository();
