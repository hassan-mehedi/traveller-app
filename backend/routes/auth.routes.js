import { Router } from "express";
import { signIn } from "../controllers/auth.controllers.js";

const router = Router();

router.route("/signin").post(signIn);

export default router;
