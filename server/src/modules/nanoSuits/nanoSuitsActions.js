import nanoSuitsRepository from "./nanoSuitsRepository.js";

const browse = async (req, res, next) => {
	try {
		const nanoSuits = await nanoSuitsRepository.readAll();
		res.json(nanoSuits);
	} catch (error) {
		next(error);
	}
};

export default { browse };
