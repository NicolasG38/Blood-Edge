import databaseClient from "../database/client.js";

const readAll = async () => {
	const [rows] = await databaseClient.query("SELECT * FROM Stores");
	return rows;
};

export default { readAll };
