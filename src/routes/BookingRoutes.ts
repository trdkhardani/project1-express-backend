import { Router } from "express";
import * as SelectSeatController from "../controllers/Booking/SelectSeatController";
const router = Router();

// router.get("/seat/:showtimeId/:theaterId", SelectSeatController.pickSeat)
router.get("/seat/:showtimeId", SelectSeatController.showtimeSeats)

export default router;