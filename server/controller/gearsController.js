import gearsRepository from "../repository/gearsRepository.js";

async function list() {
	return gearsRepository.readAll();
}

async function readById(id) {
	return gearsRepository.read(id); // retourne null si non trouvé
}

async function create(payload) {
	return gearsRepository.create(payload);
}

async function update(id, payload) {
	return gearsRepository.update(id, payload);
}

async function remove(id) {
	return gearsRepository.delete(id);
}

async function readAllFr() {
	return gearsRepository.readAllFr();
}
async function readAllEn() {
	return gearsRepository.readAllEn();
}

export default { list, readById, create, update, remove, readAllFr, readAllEn };
