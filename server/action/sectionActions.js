import sectionRepository from "../repository/sectionRepository.js";

const browse = async (req, res, next) => {
	try {
		const sections = await sectionRepository.readAll();
		res.json(sections);
	} catch (error) {
		console.error("Erreur API /api/sections :", error);
		res.status(500).json({ error: error.message });
	}
};

export default { browse };
