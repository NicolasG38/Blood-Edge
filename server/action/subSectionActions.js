import subSectionRepository from "../repository/subSectionRepository.js";

const browseArsenal = async (req, res, next) => {
	try {
		const subSections = await subSectionRepository.readAllArsenal();
		res.json(subSections);
	} catch (error) {
		console.error("Erreur API /api/sections :", error);
		res.status(500).json({ error: error.message });
	}
};

export default { browseArsenal };
