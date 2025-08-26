import databaseClient from "../database/client.js";

const statsRepository = {
	getAllStats: async () => {
		const [rows] = await databaseClient.query("SELECT * FROM StatsEVE");
		return rows;
	},

	getStatById: async (id) => {
		const [rows] = await databaseClient.query(
			"SELECT * FROM StatsEVE WHERE Stats_id = ?",
			[id],
		);
		return rows[0];
	},

	createStat: async (statData) => {
		const [result] = await databaseClient.query("INSERT INTO StatsEVE SET ?", [
			statData,
		]);
		return result.insertId;
	},

	updateStat: async (id, statData) => {
		await databaseClient.query("UPDATE StatsEVE SET ? WHERE Stats_id = ?", [
			statData,
			id,
		]);
	},

	deleteStat: async (id) => {
		await databaseClient.query("DELETE FROM StatsEVE WHERE Stats_id = ?", [id]);
	},
};

export default statsRepository;
