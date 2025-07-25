import express from "express";
import mysql from "mysql2";
import nanoSuitsActions from "./src/modules/nanoSuits/nanoSuitsActions.js"; // adapte le chemin si besoin
import dotenv from "dotenv";
import signUpActions from "./src/modules/signUp/signUpActions.js";
import loginActions from "./src/modules/login/loginActions.js"; // adapte le chemin si besoin
import AddFavoriteAction from "./src/functionnality/AddFavoriteAction.js";
dotenv.config();

const router = express.Router();

router.get("/api/nanosuits", nanoSuitsActions.browse);
router.post("/api/favorites", async (req, res) => {
	const { userId, nanoSuitId } = req.body;
	try {
		const result = await AddFavoriteAction.addFavorite(userId, nanoSuitId);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: "Erreur lors de l'ajout du favori" });
	}
});
router.delete("/api/favorites", async (req, res) => {
	const { userId, nanoSuitId } = req.body;
	try {
		const result = await AddFavoriteAction.removeFavorite(userId, nanoSuitId);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: "Erreur lors de la suppression du favori" });
	}
});
router.get("/test", (req, res) => {
	res.send("c'est cassé");
});

router.post("/api/users", signUpActions.create);
router.get("/api/users", signUpActions.browse);
router.post("/api/login", loginActions.login);

export default router;
