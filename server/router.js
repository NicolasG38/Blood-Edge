import express from "express";

import equipmentActions from "./action/equipmentActions.js";
import exospineActions from "./action/exospineActions.js";
import favoriteController from "./controller/favoriteController.js";
import locationsActions from "./action/locationsActions.js";
import loginController from "./action/loginActions.js";
import nanoSuitsActions from "./action/nanoSuitsActions.js";
import sectionActions from "./action/sectionActions.js";
import signupActions from "./action/signupActions.js";
import statsActions from "./action/statsActions.js"; // données brut
import StatsEVEActions from "./action/StatsEVEActions.js"; // graphique visuelle
import storesActions from "./action/storesActions.js";
import subSectionActions from "./action/subSectionActions.js";
import usersActions from "./action/usersActions.js";

import { validateSignup } from "./controller/signupController.js";
import { getMe } from "./controller/userController.js";
import { requireAuth, requireAdmin } from "./middleware/auth.js";
import { loginLimiter } from "./middleware/rateLimiters.js";

const router = express.Router();

// Middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Healthcheck
router.get("/health", (req, res) => res.json({ status: "ok" }));

// Stats EVE
router.get("/api/stats-eve", StatsEVEActions.browse);
router.get("/api/stats", statsActions.getAllStats);
router.get("/api/stats/:id", statsActions.getStatById);
router.post("/api/stats", requireAuth, requireAdmin, statsActions.createStat);
router.put(
	"/api/stats/:id",
	requireAuth,
	requireAdmin,
	statsActions.updateStat,
);
router.delete(
	"/api/stats/:id",
	requireAuth,
	requireAdmin,
	statsActions.deleteStat,
);

//Exospine
router.get("/api/exospine", exospineActions.browse);
router.get("/api/exospine/id-title", exospineActions.getIdAndTitle);

//Equipment
router.get("/api/equipment", equipmentActions.browse);
router.get("/api/equipment/id-title", equipmentActions.getIdAndTitle);

// Nano suits
router.get("/api/nanosuits", nanoSuitsActions.browse);
router.get("/api/nanosuits/id-title", nanoSuitsActions.getIdAndTitle);

// Favoris
router.post("/api/favorites", requireAuth, favoriteController.addFavorite);
router.delete("/api/favorites", requireAuth, favoriteController.removeFavorite);
router.post(
	"/api/favorites/status",
	requireAuth,
	favoriteController.isFavorite,
);
router.get("/api/favorites/:pseudo", favoriteController.getUserFavorites);

// Auth
router.post("/api/users", validateSignup, signupActions.create);
router.post("/api/login", loginLimiter, loginController.login);
router.get("/api/me", requireAuth, getMe);
router.post("/api/logout", requireAuth, loginController.logout);

// Sections
router.get("/api/sections", sectionActions.browse);
router.get("/api/subsections", subSectionActions.browseArsenal);

// Locations
router.get("/api/locations", locationsActions.browse);

// Stores
router.get("/api/stores", storesActions.browse);

// Users
router.get("/api/users", requireAuth, requireAdmin, signupActions.browse);
router.get("/api/users/:pseudo", usersActions.readByPseudo); // accès public

// route de test
router.get("/api/test-cookie", (req, res) => {
	const token = req.cookies.token;

	res.json({ token });
});

export default router;
