// Import Modules
import cookieParser from "cookie-parser";
import logger from "winston-chalk";
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import cors from "cors";

// Import Utilities
import { validateEnv, env } from "./utils/validateEnv.js";
import HttpError from "./utils/handleError.js";

// Import Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";

// Validate environment variables
validateEnv();

// Assign variables
const port = env.PORT;
const databaseURL = env.DATABASE_URL;

// Start the server
mongoose
    .connect(databaseURL)
    .then(() => {
        // DB connection is established
        logger.info("Database connected successfully");

        // Intialize express app
        const app = express();

        // Root route
        app.get("/", (req, res) => {
            res.status(200).json({ message: "Welcome to the API" });
        });

        // Health check
        app.get("/health", (req, res) => {
            res.status(200).json({ message: "Ok" });
        });

        // Calling Middlewares
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(cookieParser());
        app.use(morgan("dev"));
        app.use(cors());

        // Add routes
        app.use("/auth", authRoutes);
        app.use("/api/users", userRoutes);
        app.use("/api/blogs", blogRoutes);

        // Handle wrong routes
        app.all("*", (req, res, next) => {
            next(new HttpError(404, `Route ${req.originalUrl} does not exist`));
        });

        // Global error handler
        app.use((err, req, res, next) => {
            err.status = err.status || "error";
            err.statusCode = err.statusCode || 500;

            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        });

        // Listen to port
        app.listen(port, () => {
            logger.info(`Backend running at http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error(err);
    });
