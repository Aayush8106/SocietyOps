import { Router } from "express";
import { login, sendOtp }  from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.post("/send-otp", sendOtp);

export default router;