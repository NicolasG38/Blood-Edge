import exospineRepository from "../repository/exospineRepository.js";

async function list() {
	return exospineRepository.readAll();
}

async function readById(id) {
	return exospineRepository.read(id); // retourne null si non trouvé
}

async function create(payload) {
	return exospineRepository.create(payload);
}

async function update(id, payload) {
	return exospineRepository.update(id, payload);
}

async function remove(id) {
	return exospineRepository.delete(id);
}

async function readAll() {
	return exospineRepository.readAll();
}

export default { list, readById, create, update, remove, readAll };
