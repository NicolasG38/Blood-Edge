import statsController from "../controller/statsController.js";

const statsActions = {
	getAllStats: statsController.getAllStats,
	getStatById: statsController.getStatById,
	createStat: statsController.createStat,
	updateStat: statsController.updateStat,
	deleteStat: statsController.deleteStat,
};

export default statsActions;
