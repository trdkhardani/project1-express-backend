import { Router } from "express";
import * as SelectSeatController from "../controllers/Booking/SelectSeatController";
const router = Router();

router.get("/seat/:showtimeId", SelectSeatController.showtimeSeats)
router.post("/seat/select/:showtimeId", SelectSeatController.pickSeat)

export default router;