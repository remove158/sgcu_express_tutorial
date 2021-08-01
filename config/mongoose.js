const config = require("./config");
const mongoose = require("mongoose");
module.exports = function () {
	mongoose.set("debug", config.debug);
	console.log(config.mongoUri);

	const db = mongoose.connect(config.mongoUri).catch((e) => {
		console.log("Can't connect to database.");
	});

	require("../app/models/post.model");
	return db;
};
