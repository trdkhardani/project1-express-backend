import { Router } from "express";
import * as MovieController from "../controllers/Movie/MovieController";
const router = Router();

router.get("/list", MovieController.movieList)

export default router;