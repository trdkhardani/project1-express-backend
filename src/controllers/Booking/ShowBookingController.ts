import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../../models/auth";
import { ShowBookingService } from "../../services/Booking/ShowBookingService";

export class ShowBookingController {
    static async bookingList(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const bookingId = req.params.bookingId as string;
            const userId = req.user?.user_id as string
            const {
                page,
                limit
            } = req.query
    
            const response = await ShowBookingService.bookingList(bookingId, userId, Number(page) || 1, Number(limit) || 3);
    
            return res.status(Number(response.statusCode)).json(response)
        } catch(err) {
            next(err)
        }
    }

    static async bookingDetail(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const bookingId = req.params.bookingId as string;
            const userId = req.user?.user_id as string
    
            const response = await ShowBookingService.bookingDetail(bookingId, userId);
    
            return res.status(Number(response.statusCode)).json(response)
        } catch(err) {
            next(err)
        }
    }
}