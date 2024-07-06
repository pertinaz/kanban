import express from "express";
import cookieParser from "cookie-parser";

const app = express(); // initializes express instance

app.use(express.json()); // enables json files parsing
app.use(cookieParser()); // enables cookie parsing

export default app;
