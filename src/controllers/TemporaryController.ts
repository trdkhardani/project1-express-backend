import type { NextFunction, Request, Response } from "express";
import { TemporaryService } from "../services/TemporaryService";
import type { PaymentGateway } from "./Booking/PaymentController";

export async function paymentSuccess(req: Request, res: Response, next: NextFunction) {
    try {
        const payment_gateway = req.query.payment_gateway as PaymentGateway
        const bookingId = req.params.bookingId as string;

        const response = await TemporaryService.paymentSuccess(bookingId, payment_gateway);

        return res.json(response)
    } catch(err) {
        next(err)
    }
}

export async function paymentCancelled(req: Request, res: Response, next: NextFunction) {
    try {
        const bookingId = req.params.bookingId as string;

        const response = await TemporaryService.paymentCancelled(bookingId);

        return res.json(response)
    } catch(err) {
        next(err)
    }
}