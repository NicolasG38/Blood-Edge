import nanoSuitsRepository from "../repository/nanoSuitsRepository.js";

const browse = async (req, res, next) => {
	try {
		const rows = await nanoSuitsRepository.readAll();
		const fr = [];
		const en = [];
		for (const row of rows) {
			if (row.title_fr) {
				fr.push({
					id: row.id,
					picture: row.picture,
					stars: row.stars,
					star_gray: row.star_gray,
					star_1: row.star_1,
					star_2: row.star_2,
					star_3: row.star_3,
					title: row.title_fr,
					text_1: row.text_1_fr,
					text_2: row.text_2_fr,
					where_title: row.where_title_fr,
					where_text: row.where_text_fr,
				});
			}
			if (row.title_en) {
				en.push({
					id: row.id,
					picture: row.picture,
					stars: row.stars,
					star_gray: row.star_gray,
					star_1: row.star_1,
					star_2: row.star_2,
					star_3: row.star_3,
					title: row.title_en,
					text_1: row.text_1_en,
					text_2: row.text_2_en,
					where_title: row.where_title_en,
					where_text: row.where_text_en,
				});
			}
		}
		res.json({ fr, en });
	} catch (err) {
		next(err);
	}
};

const getIdAndTitle = async (req, res, next) => {
	try {
		const nanoSuits = await nanoSuitsRepository.getIdAndTitle();
		res.json(nanoSuits);
	} catch (error) {
		console.error("Erreur API /api/nanosuits/id-title :", error);
		res.status(500).json({ error: error.message });
	}
};

export default { browse, getIdAndTitle };
