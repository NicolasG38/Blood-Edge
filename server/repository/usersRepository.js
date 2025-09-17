import { s } from "motion/react-client";
import databaseClient from "../database/client.js";

async function findByPseudo(pseudo) {
	// requête SQL pour récupérer l'utilisateur par pseudo
	const [user] = await databaseClient.query(
		"SELECT User_id, User_pseudo, User_email, User_timestamp FROM `User` WHERE LOWER(User_pseudo) = LOWER(?)",
		[pseudo],
	);
	console.log("Résultat SQL :", user);

	if (!user[0]) return null;

	const [signupDate] = await databaseClient.query(
		"SELECT User_timestamp FROM `User` WHERE User_id = ?",
		[user[0].User_id],
	);

	return {
		...user[0],
		User_timestamp: signupDate[0]?.User_timestamp,
	};
}

export default {
	findByPseudo,
};
