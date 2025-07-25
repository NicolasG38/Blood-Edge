import express from "express";
import mysql from "mysql2";
import nanoSuitsActions from "./src/modules/nanoSuits/nanoSuitsActions.js"; // adapte le chemin si besoin
import dotenv from "dotenv";
import signUpActions from "./src/modules/signUp/signUpActions.js";
import loginActions from "./src/modules/login/loginActions.js"; // adapte le chemin si besoin
dotenv.config();

const router = express.Router();

router.get("/api/nanosuits", nanoSuitsActions.browse);
router.get("/test", (req, res) => {
	res.send("c'est cassé");
});

router.post("/api/users", signUpActions.create);
router.get("/api/users", signUpActions.browse);
router.post("/api/login", loginActions.login);

export default router;
