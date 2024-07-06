import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./src/routes/authRoutes.js";
dotenv.config();
const app = express(); // initializes express instance

app.use(express.json()); // enables json files parsing
app.use(cookieParser()); // enables cookie parsing

app.use("/api/auth", authRouter); // use the authorization route for the users

export default app;
