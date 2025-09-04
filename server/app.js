import "dotenv/config";
import express from "express";
import router from "./router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3310;
const CLIENT_URL = process.env.CLIENT_URL;

import session from "express-session";
app.use(
	session({
		secret: "tonSecret",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }, // ou true en production HTTPS
	}),
);

// Ajoute cookie-parser comme middleware
app.use(cookieParser());

// CORS: on ne met pas d’URL comme chemin, seulement comme origin
app.use(
	cors({
		origin: CLIENT_URL,
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statique OK (chemins relatifs seulement)
app.use("/images", express.static("public/images"));
app.use("/icons", express.static("public/icons"));

// Monte le router sur un chemin relatif (pas d’URL absolue)
app.use("/", router);

app.listen(PORT, () => {
	console.log("Server running at PORT: ", PORT);
});

export default app;
