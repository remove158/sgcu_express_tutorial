import express from "express";
import postRouter from "../app/routes/post.routes.js";
const logger = (req, res, next) => {
	console.log(req.method, req.originalUrl);
	next();
};
export default function () {
	const app = express();
	app.use(express.json());
	app.use(logger);
	app.use(postRouter);
	return app;
}
