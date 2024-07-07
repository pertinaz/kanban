import { Router } from "express";

import {
  register,
  registerAdmin,
  login,
  logout,
  getProfile,
} from "../controllers/authController.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Root path");
});

router.post("/register-admin", registerAdmin); // admin registration route

router.post("/register", register); // user registration route

router.post("/login", login); // login route

router.post("/logout", logout); // logout route

router.get("/profile", getProfile); // profile route

export default router;
