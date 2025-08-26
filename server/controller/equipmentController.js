import equipmentRepository from "../repository/equipmentRepository.js";

async function list() {
	const equipment = await equipmentRepository.readAll();
	return equipment;
}

async function getIdAndTitle() {
	const equipment = await equipmentRepository.getIdAndTitle();
	return equipment;
}

export default { list, getIdAndTitle };
