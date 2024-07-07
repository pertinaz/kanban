import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

//config the database connection
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB.PASS,
  port: process.env.DB_PORT,
});

//connect to the database
export const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Connected to database successfully");
  } catch (err) {
    console.log("Unableto connect to database", err);
  }
};
