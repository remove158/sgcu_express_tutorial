module.exports = function (app) {
	const postControllers = require("../controllers/post.controllers");
	app.post("/post", postControllers.create);
	app.get("/posts", postControllers.viewAll);
	app.get(
		"/post/:id",
		postControllers.isValidMongoID,
		postControllers.viewId
	);
	app.put(
		"/post/:id",
		postControllers.isValidMongoID,
		postControllers.editId
	);
	app.delete(
		"/post/:id",
		postControllers.isValidMongoID,
		postControllers.deleteId
	);
	app.post(
		"/post/:id/reply",
		postControllers.isValidMongoID,
		postControllers.replyPost
	);
};
