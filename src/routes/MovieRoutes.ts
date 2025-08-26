import { Router } from "express";
import * as MovieController from "../controllers/Movie/MovieController";
import * as ShowtimeDetailController from "../controllers/Movie/ShowtimeDetailController";
const router = Router();

router.get("/list", MovieController.movieList)
router.get("/showtime/detail/:movieId", ShowtimeDetailController.showtimeDetail)

export default router;