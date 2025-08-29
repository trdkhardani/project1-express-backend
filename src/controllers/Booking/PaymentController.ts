import type { Request, Response, NextFunction } from "express";
import * as PaymentService from '../../services/Booking/PaymentService'

export async function checkout(req: Request, res: Response, next: NextFunction) {
    try {
        // const theaterId = req.params.theaterId as string
        const bookingId = req.params.bookingId as string

        const response = await PaymentService.checkout(bookingId)

        return res.json(response)
    } catch(err: any) {
        next(err)
    }
}

export async function invoiceUrl(req: Request, res: Response, next: NextFunction) {
    try {
        const bookingId = req.params.bookingId as string;

        const response = await PaymentService.invoiceUrl(bookingId)

        if(response.statusCode === 202) {
            return res.status(response.statusCode).json(response)
        }

        return res.redirect(response?.data.original_invoice_url);
    } catch(err: any) {
        next(err)
    }
}