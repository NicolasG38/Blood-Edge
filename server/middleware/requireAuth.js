import jwt from "jsonwebtoken";

function requireAuth(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({ error: "Token manquant" });
	}
	const token = authHeader.split(" ")[1]; // Format "Bearer <token>"
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded; // Ajoute l'utilisateur à la requête
		next();
	} catch (err) {
		return res.status(401).json({ error: "Token invalide" });
	}
}

export default requireAuth;
