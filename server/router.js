import express from "express";

const router = express.Router();

// Define your routes here
// Example:
router.get("/test", (req, res) => {
	res.send("Test route... et ça marche super bien !");
});

export default router;
