// config/mongoose.js
import { mongoUri, debug } from "./config.js";
import mongoose from "mongoose";
export default function () {
	mongoose.set("debug", debug);
	const db = mongoose.connect(mongoUri).catch((e) => {
		console.log("Can't connect to database.");
	});

	return db;
}
