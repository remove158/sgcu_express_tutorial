const signIn = async (req, res) => {
	const { id } = req.query;
	if (!id) return res.sendStatus(400);
	res.cookie("userId", id);
	return res.sendStatus(200);
};

const signOut = async (req, res) => {
	res.clearCookie("userId");
	return res.sendStatus(200);
};

const test = async (req, res) => {
	const { cookies } = req;
	return res.json({ cookies });
};
const isAuthenticated = async (req, res, next) => {
	const { cookies } = req;
	if (!cookies.userId) return res.sendStatus(401);
	return next();
};
export { signIn, signOut, test, isAuthenticated };
