import statsRepository from "../repository/statsRepository.js";

const statsController = {
	getAllStats: async (req, res) => {
		const stats = await statsRepository.getAllStats();
		res.json(stats);
	},

	getStatById: async (req, res) => {
		const stat = await statsRepository.getStatById(req.params.id);
		res.json(stat);
	},

	createStat: async (req, res) => {
		const newStatId = await statsRepository.createStat(req.body);
		res.status(201).json({ id: newStatId });
	},

	updateStat: async (req, res) => {
		await statsRepository.updateStat(req.params.id, req.body);
		res.sendStatus(204);
	},

	deleteStat: async (req, res) => {
		await statsRepository.deleteStat(req.params.id);
		res.sendStatus(204);
	},
};

export default statsController;
