import databaseClient from "../database/client.js";

async function findByPseudo(pseudo) {
	// requête SQL pour récupérer l'utilisateur par pseudo
	const [user] = await databaseClient.query(
		"SELECT Users_id, Users_pseudo, Users_email, Users_created_at FROM Users WHERE LOWER(Users_pseudo) = LOWER(?)",
		[pseudo],
	);

	if (!user[0]) return null;

	const [signupDate] = await databaseClient.query(
		"SELECT Users_created_at FROM Users WHERE Users_id = ?",
		[user[0].Users_id],
	);

	return {
		...user[0],
		Users_created_at: signupDate[0]?.Users_created_at,
	};
}

async function searchByQuery(q, limit = 10) {
	const like = `%${String(q ?? "").toLowerCase()}%`;
	const max = Number(limit) || 10;
	const [rows] = await databaseClient.query(
		`SELECT Users_id, Users_pseudo, Users_email
		 FROM Users
		 WHERE LOWER(Users_pseudo) LIKE ? OR LOWER(Users_email) LIKE ?
		 ORDER BY Users_pseudo
		 LIMIT ?`,
		[like, like, max],
	);
	return rows;
}

export default {
	findByPseudo,
	searchByQuery,
};
