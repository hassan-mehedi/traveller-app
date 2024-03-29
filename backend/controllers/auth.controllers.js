// Import Modules
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Import Utilities
import { env } from "../utils/validateEnv.js";
import isTokenExpired from "../utils/validateTokenExpiration.js";
import removeKeysFromObject from "../utils/removeObjectKey.js";

// Import Models
import user from "../models/user.model.js";

const signIn = async (req, res, next) => {
    try {
        // Get user data
        const userData = await user.findOne({ email: req.body.email, isDeleted: false });

        // Check if the data is empty
        if (!userData) return res.status(404).json({ error: true, message: "User not found" });

        // Match the password
        const checkPassword = bcrypt.compareSync(req.body.password, userData.password);
        if (!checkPassword) return res.status(401).json({ error: true, message: "Invalid password" });

        // Remove password from user data
        const userDataWithoutPassword = removeKeysFromObject(userData.toObject(), ["password"]);

        // Create access token with jwt
        const accessToken = jwt.sign({ userData: userDataWithoutPassword }, env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 * 30 }); // 1 month

        return res.status(200).json({ message: "Successfully signed in", data: { token: accessToken, user: userDataWithoutPassword } });
    } catch (err) {
        next(err);
    }
};

const authenticateUser = async (req, res, next) => {
    try {
        // Check if the token is prived in the header
        if (!req.headers.token) return res.status(401).json({ message: "Token is not provided" });

        // Get the token from the header
        const token = req.headers.token.split(" ")[1];

        // Check if the token is empty
        if (!token) return res.status(401).json({ message: "Token can't be empty" });

        // Check if the token is expired
        if (isTokenExpired(token)) return res.status(401).json({ message: "Token is expired" });

        // Verify the token
        const decoded = jwt.verify(token, env.JWT_SECRET_KEY);

        // Check if the token is valid
        if (!decoded) return res.status(401).json({ message: "Token is invalid" });

        // send user data to the next function
        req.user = decoded;

        // Go to the next function
        next();
    } catch (err) {
        next(err);
    }
};

const authorizeUser = async (req, res, next) => {
    try {
        // Get the blog ID from the request parameters
        const blogId = req.params.id;

        // Get the user ID from the authenticated user object
        const userId = req.user._id;

        // Find the blog by its ID
        const blog = await blog.findById(blogId);

        // Check if the blog exists
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Check if the authenticated user is the owner of the blog
        if (blog.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to access this blog" });
        }

        // If the user is authorized, proceed to the next middleware
        next();
    } catch (err) {
        next(err);
    }
};

export { signIn, authenticateUser, authorizeUser };
