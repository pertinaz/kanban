import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

//config the database connection
export const pool = new Pool({
  user: 1, //process.env.DB_USER,
  host: 2, //process.env.DB_HOST,
  database: 3, //process.env.DB_NAME,
  password: 4, //process.env.DB.PASS,
  port: 5, //process.env.DB_PORT,
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
