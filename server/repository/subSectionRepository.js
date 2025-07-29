import databaseClient from "../database/client.js";

class subSectionRepository {
	async readAllArsenal() {
		const [rows] = await databaseClient.query("SELECT * FROM Arsenal");
		return rows;
	}
}

export default new subSectionRepository();
