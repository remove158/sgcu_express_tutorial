const express = require("express");

const logger = (req, res, next) => {
	console.log(req.method, req.originalUrl);
	next();
};
module.exports = function () {
	const app = express();
	app.use(express.json());
	app.use(logger);
	require("../app/routes/post.routes")(app);
	return app;
};
