import { Router } from "express";
const router = Router();

import { index } from "../controllers/IndexController.js";

router.get("/", index)

export default router