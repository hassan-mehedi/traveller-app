import { Router } from "express";
import { createUser, getUsers, getUserById, updateUserById, deleteUserById, getUserByEmail } from "../controllers/user.controllers.js";

import { authenticateUser } from "../controllers/auth.controllers.js";

const router = Router();

router.route("/").post(createUser).get(authenticateUser, getUsers);

router.route("/email/:email").get(getUserByEmail);

router.route("/:id").get(getUserById).put(authenticateUser, updateUserById).delete(authenticateUser, deleteUserById);

export default router;
