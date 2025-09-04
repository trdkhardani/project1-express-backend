import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../../models/auth";
import { ShowBookingService } from "../../services/Booking/ShowBookingService";

export class ShowBookingController {
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