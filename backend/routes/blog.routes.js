import { Router } from "express";
import {
    createBlog,
    getBlogs,
    getBlogById,
    getBlogsByUserId,
    getBlogsByTags,
    updateBlogById,
    deleteBlogById,
} from "../controllers/blog.controllers.js";

import { authenticateUser, authorizeUser } from "../controllers/auth.controllers.js";

const router = Router();

router.route("/").post(authenticateUser, createBlog).get(authenticateUser, getBlogs);

router.route("/tags").get(getBlogsByTags);

router.route("/user/:id").get(authenticateUser, getBlogsByUserId);

router
    .route("/:id")
    .get(authenticateUser, getBlogById)
    .put(authenticateUser, authorizeUser, updateBlogById)
    .delete(authenticateUser, authorizeUser, deleteBlogById);

export default router;
