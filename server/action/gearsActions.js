import gearsController from "../controller/gearsController.js";

const parseId = (req, res) => {
	const id = Number.parseInt(req.params.id, 10);
	if (!Number.isInteger(id) || id < 1) {
		res.status(400).json({ error: "ID invalide" });
		return null;
	}
	return id;
};
const browse = async (req, res, next) => {
	try {
		const rowsFr = await gearsController.readAllFr();
		const normalizedFr = rowsFr.map((row) => ({
			...row,
			// Barres en booléen
			Gears_star_1: row.Gears_star_1 === "true",
			Gears_star_2: row.Gears_star_2 === "true",
			Gears_star_3: row.Gears_star_3 === "true",
			//stats en nombre
			Gears_stat_1: Number(row.Gears_stat_1) || 0,
			Gears_stat_2: Number(row.Gears_stat_2) || 0,
			// Skills et textes
			Skill_1: row.Skill_1,
			Skill_2: row.Skill_2,
			Skill_3: row.Skill_3,
			text_1: row.text_1,
			text_2: row.text_2,
			// Titres
			title: row.Gears_title,
		}));
		const rowsEn = await gearsController.readAllEn();
		const normalizedEn = rowsEn.map((row) => ({
			...row,
			// Barres en booléen
			Gears_star_1: row.Gears_star_1 === "true",
			Gears_star_2: row.Gears_star_2 === "true",
			Gears_star_3: row.Gears_star_3 === "true",
			// Skills et textes
			Skill_1: row.Skill_1,
			Skill_2: row.Skill_2,
			Skill_3: row.Skill_3,
			text_1: row.text_1,
			text_2: row.text_2,
			// Titres
			title: row.Gears_title,
		}));
		res.json({ fr: normalizedFr, en: normalizedEn });
	} catch (err) {
		next(err);
	}
};

const read = async (req, res, next) => {
	try {
		const id = parseId(req, res);
		if (id === null) return;
		const row = await gearsController.read(id);
		if (!row) return res.status(404).json({ error: "Objet non trouvé" });
		res.json(row);
	} catch (err) {
		next(err);
	}
};

const add = async (req, res, next) => {
	try {
		const created = await gearsController.create(req.body);
		res.status(201).json(created);
	} catch (err) {
		next(err);
	}
};

const edit = async (req, res, next) => {
	try {
		const id = parseId(req, res);
		if (id === null) return;
		const updated = await gearsController.update(id, req.body);
		if (!updated) return res.status(404).json({ error: "Objet non trouvé" });
		res.json(updated);
	} catch (err) {
		next(err);
	}
};

const destroy = async (req, res, next) => {
	try {
		const id = parseId(req, res);
		if (id === null) return;
		const removed = await gearsController.delete(id);
		if (!removed) return res.status(404).json({ error: "Objet non trouvé" });
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};

export { browse, read, add, edit, destroy };
export default { browse, read, add, edit, destroy };
