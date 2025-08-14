import express from "express";

import nanoSuitsActions from "./action/nanoSuitsActions.js";
import favoriteController from "./controller/favoriteController.js";
import signupActions from "./action/signUpActions.js"; // si vous gardez le fichier signUpActions.js
// RECOMMANDÉ : renommer physiquement signUpActions.js -> signupActions.js puis :
//import signupActions from "./action/signupActions.js";
import { validateSignup, signup } from "./controller/signupController.js";
import loginController from "./action/loginActions.js";
import sectionActions from "./action/sectionActions.js";
import subSectionActions from "./action/subSectionActions.js";
import storesActions from "./action/storesActions.js";
import { requireAuth, requireAdmin } from "./middleware/auth.js";
import { loginLimiter } from "./middleware/rateLimiters.js";

const router = express.Router();

// Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Healthcheck
router.get("/health", (req, res) => res.json({ status: "ok" }));

// Nano suits
router.get("/api/nanosuits", nanoSuitsActions.browse);
router.get("/api/nanosuits/id-title", nanoSuitsActions.getIdAndTitle);

// Favoris
router.post("/api/favorites", favoriteController.addFavorite);
router.delete("/api/favorites", favoriteController.removeFavorite);
router.post("/api/favorites/status", favoriteController.isFavorite);

// Auth
router.post("/api/users", validateSignup, signup);
router.post("/api/login", loginLimiter, loginController.login);

// Sections
router.get("/api/sections", sectionActions.browse);
router.get("/api/subsections", subSectionActions.browseArsenal);

// Stores
router.get("/api/stores", storesActions.browse);

// Users
router.get("/api/users", requireAuth, requireAdmin, signupActions.browse);

export default router;
