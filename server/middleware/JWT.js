import jwt from "jsonwebtoken";

const token = jwt.sign({ sub: user.id.toString() }, process.env.JWT_SECRET, {
	expiresIn: "1h",
});

const decoded = jwt.verify(token, process.env.JWT_SECRET);

export { token, decoded };
