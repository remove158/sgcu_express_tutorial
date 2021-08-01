import express from "express";
import postRouter from "../app/routes/post.routes.js";
import indexRouter from "../app/routes/auth.routes.js";
import cookieParser from "cookie-parser";
const logger = (req, res, next) => {
	console.log(req.method, req.originalUrl);
	next();
};
export default function () {
	const app = express();
	app.use(express.json());
	app.use(cookieParser());
	app.use(logger);
	app.use(postRouter);
	app.use(indexRouter);
	return app;
}
