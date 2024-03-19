// Import modules
import bcrypt from "bcryptjs";

// Import model
import user from "../models/user.model.js";

// Import error handler
import HttpError from "../utils/handleError.js";

// Import utilies
import removeKeysFromObject from "../utils/removeObjectKey.js";

/**
 * Create User
 * @async
 * @method
 * @param {req} req Request object
 * @param {res} res Response object
 * @param {next} next Next function to catch and handle errors
 * @returns New user record
 */
const createUser = async (req, res, next) => {
    try {
        const userData = await user.create({ ...req.body, password: bcrypt.hashSync(req.body.password, 8) });
        const userDataWithOutPassword = removeKeysFromObject(userData.toObject(), ["password"]);

        return res.status(201).json({ message: "User created successfully", data: userDataWithOutPassword });
    } catch (err) {
        next(err);
    }
};

/**
 * Get User
 * @async
 * @method
 * @param {req} req Request object
 * @param {res} res Response object
 * @param {next} next Next function to catch and handle errors
 * @returns All the users records
 */
const getUsers = async (req, res, next) => {
    try {
        const userData = await user.find({ isDeleted: false }, "-password");

        return res.status(200).json({ message: "Found all the user", data: userData });
    } catch (err) {
        next(err);
    }
};

/**
 * Get User By Id
 * @async
 * @method
 * @param {req} req Request object
 * @param {res} res Response object
 * @param {next} next Next function to catch and handle errors
 * @returns Single user record by id
 */
const getUserById = async (req, res, next) => {
    try {
        const userData = await user.findOne({ _id: req.params.id, isDeleted: false }, "-password");

        if (!userData) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        return res.status(200).json({ message: "User found successfully", data: userData });
    } catch (err) {
        next(err);
    }
};

/**
 * Update User By Id (Doesn't update password)
 * @async
 * @method
 * @param {req} req Request object
 * @param {res} res Response object
 * @param {next} next Next function to catch and handle errors
 * @returns Single user record updated by id
 */
const updateUserById = async (req, res, next) => {
    try {
        const userExists = await user.findOne({ _id: req.params.id, isDeleted: false });

        if (!userExists) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        // Don't update password even if it was sent in the request body
        const dataWithOutPassword = removeKeysFromObject(req.body, ["password"]);

        // Update user
        const userData = await user.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { ...dataWithOutPassword },
            { new: true, fields: { password: 0 }, lean: true }
        );

        return res.status(200).json({ message: "User updated successfully", data: userData });
    } catch (err) {
        next(err);
    }
};

/**
 * Delete User By Id (Soft delete)
 * @async
 * @method
 * @param {req} req Request object
 * @param {res} res Response object
 * @param {next} next Next function to catch and handle errors
 * @returns Single user record deleted by id
 */
const deleteUserById = async (req, res, next) => {
    try {
        const userExists = await user.findOne({ _id: req.params.id, isDeleted: false });

        if (!userExists) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        // Update user's isDeleted field to true
        const userData = await user.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isDeleted: true, deletedAt: new Date().toISOString() },
            { new: true, fields: { password: 0 }, lean: true }
        );

        return res.status(200).json({ message: "User deleted successfully", data: userData });
    } catch (err) {
        next(err);
    }
};

const getUserByEmail = async (req, res, next) => {
    try {
        const userData = await user.findOne({ email: req.params.email, isDeleted: false }, "-password");

        if (!userData) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        return res.status(200).json({ message: "User found successfully", data: userData });
    } catch (err) {
        next(err);
    }
};

export { createUser, getUsers, getUserById, updateUserById, deleteUserById, getUserByEmail };
