import locationsRepository from "../repository/locationsRepository.js";

const browse = async (req, res, next) => {
	try {
		const locations = await locationsRepository.readAll();
		res.json(locations);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve locations" });
	}
};

export default {
	browse,
};
