// Load environment variables from .env file
import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
};

export default config;
