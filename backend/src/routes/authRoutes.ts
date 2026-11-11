import { Router } from "express";
import { login, register, sendOtp }  from "../controllers/authController.js";

const router = Router();

router.post("/login"    , login);
router.post("/send-otp" , sendOtp);
router.post("/register" , register);

export default router;