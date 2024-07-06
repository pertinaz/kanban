import { Router } from "express";

const router = Router();

router.get('/',(req,res)=>{
    res.send('Root path');
});

router.post("/register-admin"); // admin registration route

router.post("/register"); // user registration route

router.post("/login"); // login route

router.post("/logout"); // logout route

router.get("/profile"); // profile route




export default router;