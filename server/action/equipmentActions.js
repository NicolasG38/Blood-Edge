import equipmentController from "../controller/equipmentController.js";

const parseId = (req, res) => {
	const id = Number.parseInt(req.params.id, 10);
	if (!Number.isInteger(id) || id < 1) {
		res.status(400).json({ error: "ID invalide" });
		return null;
	}
	return id;
};
const browse = async (req, res) => {
	try {
		const rows = await equipmentController.list();
		res.json(rows);
	} catch (error) {
		console.error("Error fetching equipment:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const read = async (req, res) => {
	const id = parseId(req, res);
	if (!id) return;

	try {
		const equipment = await equipmentController.read(id);
		if (!equipment) {
			res.status(404).json({ error: "Equipment not found" });
			return;
		}
		res.json(equipment);
	} catch (error) {
		console.error("Error fetching equipment:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
const getIdAndTitle = async (req, res, next) => {
	try {
		const rows = await equipmentController.getIdAndTitle();
		res.json(rows);
	} catch (err) {
		next(err);
	}
};
export default { browse, read, getIdAndTitle };
