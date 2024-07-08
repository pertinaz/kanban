import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./src/dbConfig.js";

import authRouter from "./src/routes/authRoutes.js";
import dashboardRouter from "./src/routes/kanbanRoutes.js";

dotenv.config();

const app = express(); // initializes express instance

app.use(express.json()); // enables json files parsing
app.use(cookieParser()); // enables cookie parsing
connectDB(); // connects to database

app.use("/api/auth", authRouter); // use the authorization route for the users
app.use("/api/kanban", dashboardRouter); // use the authorization route for the dashboard
export default app;
