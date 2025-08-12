import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
	const auth = req.headers.authorization;
	if (!auth?.startsWith("Bearer "))
		return res.status(401).json({ error: "UNAUTHORIZED" });
	const token = auth.slice(7);
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;
		next();
	} catch {
		return res.status(401).json({ error: "UNAUTHORIZED" });
	}
}

export function requireAdmin(req, res, next) {
	if (!req.user?.role) {
		return res.status(403).json({ error: "FORBIDDEN_NO_ROLE" });
	}
	if (req.user.role !== "admin") {
		return res.status(403).json({ error: "FORBIDDEN" });
	}
	next();
}
