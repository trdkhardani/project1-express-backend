import type { NextFunction, Request, Response } from "express";
import { TemporaryService } from "../services/TemporaryService";

export async function paymentSuccess(req: Request, res: Response, next: NextFunction) {
    try {
        const bookingId = req.params.bookingId as string;

        const response = await TemporaryService.paymentSuccess(bookingId);

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