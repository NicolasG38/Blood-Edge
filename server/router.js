import express from "express";
import dotenv from "dotenv";

import nanoSuitsActions from "./action/nanoSuitsActions.js";
import signUpActions from "./action/signUpActions.js";
import loginActions from "./action/loginActions.js";

import pkg from "jsonwebtoken";

const { sign } = pkg;
dotenv.config();
const router = express.Router();

router.get("/api/nanosuits", nanoSuitsActions.browse);

//Liste des Nano_suits avec leurs ID et titres pour la page Nano_suits
router.get("/api/nanosuits/id-title", nanoSuitsActions.getIdAndTitle);

import favoriteController from "./controller/favoriteController.js";
// Ajout/Suppression au favoris avec controle des données (créer un fichier spécifique pour y sortir du router)
router.post("/api/favorites", favoriteController.addFavorite);
router.delete("/api/favorites", favoriteController.removeFavorite);
router.post("/api/favorites/status", favoriteController.isFavorite);

//Création de compte utilisateur et connexion
router.post("/api/users", signUpActions.create, signUpActions.messageSuccess);
router.get("/api/users", signUpActions.browse);
router.post("/api/login", loginActions.login);

//===

// Route pour récupérer les sections
import sectionActions from "./action/sectionActions.js";
// Cette route permet de récupérer toutes les sections disponibles
router.get("/api/sections", sectionActions.browse);

import subSectionActions from "./action/subSectionActions.js";
router.get("/api/subsections", subSectionActions.browseArsenal);

import storesActions from "./action/storesActions.js";
// Route pour récupérer les magasins
router.get("/api/stores", storesActions.browse);

export default router;
