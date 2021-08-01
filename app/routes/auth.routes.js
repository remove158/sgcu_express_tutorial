import express from "express";
import * as authControllers from "../controllers/auth.controllers.js";
const router = express.Router();

router.get("/auth/signin", authControllers.signIn);
router.delete("/auth/signout", authControllers.signOut);

export default router;
