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
		const rows = await exospineController.list();
		res.json(rows);
	} catch (err) {
		next(err);
	}
};

const read = async (req, res, next) => {
	try {
		const id = parseId(req, res);
		if (id === null) return;
		const row = await exospineController.readById(id);
		if (!row) return res.status(404).json({ error: "Exospine non trouvée" });
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
		if (!updated)
			return res.status(404).json({ error: "Exospine non trouvée" });
		res.json(updated);
	} catch (err) {
		next(err);
	}
};

const destroy = async (req, res, next) => {
	try {
		const id = parseId(req, res);
		if (id === null) return;
		const removed = await exospineController.remove(id);
		if (!removed)
			return res.status(404).json({ error: "Exospine non trouvée" });
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
};

const getIdAndTitle = async (req, res, next) => {
	try {
		const rows = await exospineController.getIdAndTitle();
		res.json(rows);
	} catch (err) {
		next(err);
	}
};

export { browse, read, add, edit, destroy, getIdAndTitle };
export default { browse, read, add, edit, destroy, getIdAndTitle };
