import express from "express";
import mysql from "mysql2";
import nanoSuitsActions from "./src/modules/nanoSuits/nanoSuitsActions.js"; // adapte le chemin si besoin
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

router.get("/api/nanosuits", nanoSuitsActions.browse);

router.get("/test", (req, res) => {
	res.send("c'est cassé");
});
console.log("DB_NAME:", process.env.DB_NAME);
export default router;
