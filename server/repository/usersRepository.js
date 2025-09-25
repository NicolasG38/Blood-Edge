import { s } from "motion/react-client";
import databaseClient from "../database/client.js";

async function findByPseudo(pseudo) {
	// requête SQL pour récupérer l'utilisateur par pseudo
	const [user] = await databaseClient.query(
		"SELECT Users_id, Users_pseudo, Users_email, Users_created_at FROM Users WHERE LOWER(Users_pseudo) = LOWER(?)",
		[pseudo],
	);
	console.log("Résultat SQL :", user);

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

export default {
	findByPseudo,
};
