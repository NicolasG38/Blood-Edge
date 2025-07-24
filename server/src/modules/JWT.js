import jwt from "jsonwebtoken";

const token = jwt.sign(
	{ sub: user.id.toString() }, // payload
	process.env.JWT_SECRET, // clé secrète
	{ expiresIn: "1h" }, // durée de validité
);

const decoded = jwt.verify(token, process.env.JWT_SECRET);

export { token, decoded };
