import dotenv from "dotenv";
dotenv.config();
export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 4004,
  DATABASE_URL: process.env.DATABASE_URL || "",
};
