import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
	let token;
	const auth = req.headers.authorization;
	if (auth?.startsWith("Bearer ")) {
		token = auth.slice(7);
	} else if (req.cookies?.token) {
		token = req.cookies.token;
	}

	if (!token) return res.status(401).json({ error: "UNAUTHORIZED" });
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		req.user = payload;
		next();
	} catch (err) {
		console.error("Erreur JWT:", err);
		return res.status(401).json({ error: "UNAUTHORIZED" });
	}
}

export function requireAdmin(req, res, next) {
	if (!req.users?.role)
		return res.status(403).json({ error: "FORBIDDEN_NO_ROLE" });
	if (req.user.role !== "admin")
		return res.status(403).json({ error: "FORBIDDEN" });
	next();
}
