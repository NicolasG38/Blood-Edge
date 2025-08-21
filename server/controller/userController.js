export function getMe(req, res) {
	res.json({ user: req.user });
}
