import nanoSuitsActions from "../action/nanoSuitsActions.js";

const browse = async (req, res, next) => {
	return nanoSuitsActions.browse(req, res, next);
};

const getIdAndTitle = async (req, res, next) => {
	return nanoSuitsActions.getIdAndTitle(req, res, next);
};

export default { browse, getIdAndTitle };
