import { Router } from "express";
import * as RegisterController from "../controllers/Auth/RegisterController";
const router = Router();

router.post("/auth/register", RegisterController.register)
router.get("/auth/register/verify/:tokenizedUserId", RegisterController.verifyUser)

export default router;