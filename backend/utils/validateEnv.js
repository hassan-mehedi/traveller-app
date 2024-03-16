import { cleanEnv, port, str, num } from "envalid";
import dotenv from "dotenv";
dotenv.config();

const validateEnv = () => {
    cleanEnv(process.env, {
        PORT: port(),
        DATABASE_URL: str(),
        JWT_SECRET_KEY: str(),
    });
};

const env = cleanEnv(process.env, {
    PORT: port(),
    DATABASE_URL: str(),
    JWT_SECRET_KEY: str(),
});

export { validateEnv, env };
