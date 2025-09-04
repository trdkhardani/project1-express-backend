import type { Request, Response, NextFunction } from "express";
import * as PaymentService from '../../services/Booking/PaymentService'
import type { AuthenticatedRequest } from "../../models/auth";

export enum PaymentGateway {
    STRIPE = "STRIPE",
    MIDTRANS = "MIDTRANS"
}

export async function checkout(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const payment_gateway = req.body.payment_gateway as PaymentGateway
        const bookingId = req.params.bookingId as string

        const response = await PaymentService.checkout(bookingId, payment_gateway)

        return res.json(response)
    } catch(err: any) {
        next(err)
    }
}

export async function invoiceUrl(req: AuthenticatedRequest, res: Response, next: NextFunction) {
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