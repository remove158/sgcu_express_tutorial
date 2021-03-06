import express from "express";
import * as postControllers from "../controllers/post.controllers.js";
import * as authControllers from "../controllers/auth.controllers.js";
const router = express.Router();

router.post("/post", authControllers.isAuthenticated, postControllers.create);
router.get("/posts", postControllers.viewAll);
router.get("/post/:id", postControllers.isValidMongoID, postControllers.viewId);
router.put("/post/:id", postControllers.isValidMongoID, postControllers.editId);
router.delete(
	"/post/:id",
	postControllers.isValidMongoID,
	postControllers.deleteId
);
router.post(
	"/post/:id/reply",
	postControllers.isValidMongoID,
	postControllers.replyPost
);

export default router;
