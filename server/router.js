import express from "express";
import dotenv from "dotenv";

import nanoSuitsActions from "./action/nanoSuitsActions.js";
import signUpActions from "./action/signUpActions.js";
import loginActions from "./action/loginActions.js";
import FavoriteAction from "./action/FavoriteAction.js";
import pkg from "jsonwebtoken";

const { sign } = pkg;
dotenv.config();
const router = express.Router();

router.get("/api/nanosuits", nanoSuitsActions.browse);

//Liste des Nano_suits avec leurs ID et titres pour la page Nano_suits
router.get("/api/nanosuits/id-title", nanoSuitsActions.getIdAndTitle);

// ajout/suppression au favoris avec controle des données
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

//Création de compte utilisateur et connexion
router.post("/api/users", signUpActions.create, signUpActions.messageSuccess);
router.get("/api/users", signUpActions.browse);
router.post("/api/login", loginActions.login);

export default router;
