import exospineController from "../controller/exospineController.js";

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
		const rows = await exospineController.readAll();
		// Mapping pour transformer les barres en booléen
		const normalized = rows.map((row) => ({
			...row,
			Exospine_bar_1: row.Exospine_bar_1 === "true",
			Exospine_bar_2: row.Exospine_bar_2 === "true",
			Exospine_bar_3: row.Exospine_bar_3 === "true",
		}));
		res.json(normalized);
	} catch (err) {
		next(err);
	}
};

const read = async (req, res, next) => {
	try {
		const id = parseId(req, res);
		if (id === null) return;
		const row = await exospineController.read(id);
		if (!row) return res.status(404).json({ error: "Objet non trouvé" });
		res.json(row);
	} catch (err) {
		next(err);
	}
};

const add = async (req, res, next) => {
	try {
		const created = await exospineController.create(req.body);
		res.status(201).json(created);
	} catch (err) {
		next(err);
	}
};

const edit = async (req, res, next) => {
	try {
		const id = parseId(req, res);
		if (id === null) return;
		const updated = await exospineController.update(id, req.body);
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
		const removed = await exospineController.delete(id);
		if (!removed) return res.status(404).json({ error: "Objet non trouvé" });
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};

export { browse, read, add, edit, destroy };
export default { browse, read, add, edit, destroy };
