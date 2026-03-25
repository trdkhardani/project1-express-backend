import { Router } from "express";
import * as RegisterController from "../controllers/Auth/RegisterController.ts";
import * as LoginController from "../controllers/Auth/LoginController.ts";
const router = Router();

router.post("/register", RegisterController.register)
router.get("/register/verify/:tokenizedUserId", RegisterController.verifyUser)
router.post("/register/resend-verification", RegisterController.resendVerification)

router.post("/login", LoginController.login)

export default router;