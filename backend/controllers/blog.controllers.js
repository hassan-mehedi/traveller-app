import blog from "../models/blog.model.js";
import logger from "winston-chalk";

/**
 * Create a new blog using the provided request data.
 * @async
 * @method
 * @param {object} req - The request object containing the blog data.
 * @param {object} res - The response object to send back the result.
 * @return {object} The JSON response with the message and blog data.
 * @throws {Error} If there is an error while creating the blog.
 */
const createBlog = async (req, res) => {
    try {
        // Set default values
        if (req.body.isDeleted) req.body.isDeleted = false;
        if (req.body.deletedAt) req.body.deletedAt = null;

        // Create blog
        const blogData = await blog.create(req.body);

        logger.info("Blog created successfully");
        return res.status(201).json({ message: "Blog created successfully", data: blogData });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Get all blogs.
 * @async
 * @method
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The JSON response with the message and blog data.
 * @throws {Error} If there is an error while getting the blogs.
 */
const getBlogs = async (req, res) => {
    try {
        const blogData = await blog.aggregate([
            { $sort: { createdAt: -1 } },
            { $limit: 10 },
            { $addFields: { numComments: { $size: "$comments" }, numLikes: { $size: "$likes" } } },
        ]);

        if (blogData.length === 0) {
            logger.warn("Blogs not found");
            return res.status(404).json({ message: "Blogs not found" });
        }

        logger.info("Blogs found successfully");
        return res.status(200).json({ message: "Blogs found successfully", data: blogData });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Get blog by id.
 * @async
 * @method
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The JSON response with the message and blog data.
 * @throws {Error} If there is an error while getting the blog.
 */
const getBlogById = async (req, res) => {
    try {
        const blogData = await blog.findOne({ _id: req.params.id, isDeleted: false });

        logger.info(`Blog with id ${req.params.id} found successfully`);
        return res.status(200).json({ message: "Blog found successfully", data: blogData });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Get blog by user id.
 * @async
 * @method
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The JSON response with the message and blog data.
 * @throws {Error} If there is an error while getting the blog.
 */
const getBlogsByUserId = async (req, res) => {
    try {
        const blogData = await blog.aggregate([
            { $match: { user: req.params.id, isDeleted: false } },
            { $sort: { createdAt: -1 } },
            { $limit: 10 },
            { $addFields: { numComments: { $size: "$comments" }, numLikes: { $size: "$likes" } } },
        ]);

        if (blogData.length === 0) {
            logger.warn(`Blogs for user id ${req.params.id} not found`);
            return res.status(404).json({ message: "Blogs not found" });
        }

        logger.info(`Blogs for user id ${req.params.id} found successfully`);
        return res.status(200).json({ message: "Blog found successfully", data: blogData });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Get blog by tags.
 * @async
 * @method
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The JSON response with the message and blog data.
 * @throws {Error} If there is an error while getting the blog.
 */
const getBlogsByTags = async (req, res) => {
    try {
        console.log(req.query.tag);
        const blogData = await blog.aggregate([
            { $match: { tags: { $in: req.query.tags }, isDeleted: false } },
            { $sort: { createdAt: -1 } },
            { $limit: 10 },
            { $addFields: { numComments: { $size: "$comments" }, numLikes: { $size: "$likes" } } },
        ]);

        if (blogData.length === 0) {
            logger.warn(`Blogs with tag ${req.params.tag} not found`);
            return res.status(404).json({ message: "Blogs not found" });
        }

        logger.info(`Blog with tag ${req.params.tag} found successfully`);
        return res.status(200).json({ message: "Blog found successfully", data: blogData });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Update blog by id.
 * @async
 * @method
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The JSON response with the message and blog data.
 * @throws {Error} If there is an error while updating the blog.
 */
const updateBlogById = async (req, res) => {
    try {
        // Set default values
        if (req.body.isDeleted) req.body.isDeleted = false;
        if (req.body.deletedAt) req.body.deletedAt = null;

        // Update blog
        const blogData = await blog.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, req.body, { new: true });

        logger.info(`Blog with id ${req.params.id} updated successfully`);
        return res.status(200).json({ message: "Blog updated successfully", data: blogData });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Delete blog by id.
 * @async
 * @method
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {object} The JSON response with the message and blog data.
 * @throws {Error} If there is an error while deleting the blog.
 */
const deleteBlogById = async (req, res) => {
    try {
        // Update blog
        const blogData = await blog.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isDeleted: true, deletedAt: new Date().toISOString() },
            { new: true }
        );

        logger.info(`Blog with id ${req.params.id} deleted successfully`);
        return res.status(200).json({ message: "Blog deleted successfully", data: blogData });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export { createBlog, getBlogs, getBlogById, getBlogsByUserId, getBlogsByTags, updateBlogById, deleteBlogById };
