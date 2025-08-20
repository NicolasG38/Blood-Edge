import statsEVERepository from "../repository/statsEVERepository.js";

async function browse(req, res) {
	try {
		const rows = await statsEVERepository.browse();
		return res.json(rows); // doit être un tableau
	} catch (e) {
		console.error("[stats-eve] browse error:", e);
		return res.status(500).json({ error: "SERVER_ERROR" });
	}
}
export default { browse };
