import { Router } from "express";

import { register } from "../controllers/authController.js";

const router = Router();

router.get('/',(req,res)=>{
    res.send('Root path');
});

router.post("/register-admin"); // admin registration route

router.post("/register",register); // user registration route

router.post("/login"); // login route

router.post("/logout"); // logout route

router.get("/profile"); // profile route




export default router;