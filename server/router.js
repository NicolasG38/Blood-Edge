import express from "express";
import dotenv from "dotenv";

import nanoSuitsActions from "./action/nanoSuitsActions.js";
import favoriteController from "./controller/favoriteController.js";
import signUpActions from "./action/signUpActions.js";
import { validateSignup } from "./controller/signupController.js"; // corrigé
import loginController from "./action/loginActions.js";
import sectionActions from "./action/sectionActions.js";
import subSectionActions from "./action/subSectionActions.js";
import storesActions from "./action/storesActions.js";
import { requireAuth, requireAdmin } from "./middleware/auth.js";

dotenv.config();
const router = express.Router();

// Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Nano suits
router.get("/api/nanosuits", nanoSuitsActions.browse);
router.get("/api/nanosuits/id-title", nanoSuitsActions.getIdAndTitle);

// Favoris
router.post("/api/favorites", favoriteController.addFavorite);
router.delete("/api/favorites", favoriteController.removeFavorite);
router.post("/api/favorites/status", favoriteController.isFavorite);

// Auth
router.post("/api/users", validateSignup, signUpActions.create); // suppression messageSuccess
router.post("/api/login", loginController.login);

// Sections
router.get("/api/sections", sectionActions.browse);
router.get("/api/subsections", subSectionActions.browseArsenal);

// Stores
router.get("/api/stores", storesActions.browse);

// Users
router.get("/api/users", requireAuth, requireAdmin, signUpActions.browse);

export default router;
