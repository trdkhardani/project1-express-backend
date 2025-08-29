import { Router } from "express";
import * as SelectSeatController from "../controllers/Booking/SelectSeatController";
import * as PaymentController from "../controllers/Booking/PaymentController";
const router = Router();

router.get("/seat/:showtimeId", SelectSeatController.showtimeSeats)
router.post("/seat/select/:showtimeId", SelectSeatController.pickSeat)
router.get("/payment/:bookingId", PaymentController.checkout)
router.get("/invoice/:bookingId", PaymentController.invoiceUrl)

export default router;