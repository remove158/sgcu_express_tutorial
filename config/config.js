import dotenv from "dotenv";
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `./.env.${env}` });

export const mongoUri = process.env.mongoUri || "";
export const debug = process.env.debug === "true";
