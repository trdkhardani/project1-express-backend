import { Router } from "express";
import * as RegisterController from "../controllers/Auth/RegisterController";
import * as LoginController from "../controllers/Auth/LoginController";
const router = Router();

router.post("/auth/register", RegisterController.register)
router.get("/auth/register/verify/:tokenizedUserId", RegisterController.verifyUser)
router.post("/auth/register/resend-verification", RegisterController.resendVerification)

router.post("/auth/login", LoginController.login)

export default router;