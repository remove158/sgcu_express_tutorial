import { mongoUri, debug } from "./config.js";
import mongoose from "mongoose";
export default function () {
	mongoose.set("debug", debug);
	console.log("🚀 ~ file: mongoose.js ~ line 8 ~ mongoUri", mongoUri);
	const db = mongoose.connect(mongoUri).catch((e) => {
		console.log("Can't connect to database.");
	});

	return db;
}
