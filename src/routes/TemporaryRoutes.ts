import { Router } from "express";
const router = Router();

import * as TemporaryController from "../controllers/TemporaryController";

router.get("/stripe/payment-success/:bookingId", TemporaryController.paymentSuccess)
router.get("/stripe/cancel-payment/:bookingId", TemporaryController.paymentCancelled)

export default router