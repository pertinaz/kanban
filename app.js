import express from "express";
import cookieParser from "cookie-parser";

import router from "./src/routes/authRoutes.js";

const app = express(); // initializes express instance

app.use(express.json()); // enables json files parsing
app.use(cookieParser()); // enables cookie parsing

app.use("/api",router);

export default app;
