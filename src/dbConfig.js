import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

//config the database connection
export const pool = new Pool({
  user: "usuario", //process.env.DB_USER,
  host: "hosting", //process.env.DB_HOST,
  database: "database", //process.env.DB_NAME,
  password: "12345", //process.env.DB.PASS,
  port: 3000, //process.env.DB_PORT,
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
