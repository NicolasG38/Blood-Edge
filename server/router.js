import express from "express";
import dotenv from "dotenv";

import nanoSuitsActions from "./action/nanoSuitsActions.js";
import signUpActions from "./action/signUpActions.js";
import loginActions from "./action/loginActions.js";
import FavoriteAction from "./action/FavoriteAction.js";

dotenv.config();

const router = express.Router();

router.get("/api/nanosuits", nanoSuitsActions.browse);
router.get("/api/nanosuits/id-title", nanoSuitsActions.getIdAndTitle);
// ajout au favoris avec controle des données
router.post("/api/favorites", async (req, res) => {
	const { userId, nanoSuitId } = req.body;
	try {
		const result = await FavoriteAction.addFavorite(userId, nanoSuitId);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: "Erreur lors de l'ajout du favori" });
	}
});
router.delete("/api/favorites", async (req, res) => {
	const { userId, nanoSuitId } = req.body;
	try {
		const result = await FavoriteAction.removeFavorite(userId, nanoSuitId);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: "Erreur lors de la suppression du favori" });
	}
});
router.post("/api/favorites/status", FavoriteAction.isFavorite);
router.get("/test", (req, res) => {
	res.send("c'est cassé");
});

router.post("/api/users", signUpActions.create);
router.get("/api/users", signUpActions.browse);
router.post("/api/login", loginActions.login);

export default router;
