import databaseClient from "../database/client.js";

export async function findByPseudo(pseudo) {
	// requête SQL pour récupérer l'utilisateur par pseudo
	const [user] = await databaseClient.query(
		"SELECT User_id, User_pseudo, User_email FROM `User` WHERE LOWER(User_pseudo) = LOWER(?)",
		[pseudo],
	);
	console.log("Résultat SQL :", user);
	return user[0];
}

export default {
	findByPseudo,
};
