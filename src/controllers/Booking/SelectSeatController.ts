import type { Request, Response, NextFunction } from "express";
import * as SelectSeatService from '../../services/Booking/SelectSeatService'
import type { AuthenticatedRequest } from "../../models/auth";

export async function showtimeSeats(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        // const theaterId = req.params.theaterId as string
        const showtimeId = req.params.showtimeId as string

        const response = await SelectSeatService.showtimeSeats(showtimeId)

        return res.json(response)
    } catch(err: any) {
        next(err)
    }
}

export async function pickSeat(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.user_id as string;

        const showtimeId = req.params.showtimeId as string
        const {
            seat_count,
            seats,
        } = req.body
        
        const response = await SelectSeatService.selectSeat({
            showtimeId: showtimeId, 
            selectedSeats: seats, 
            userId: userId, 
            seatCount: seat_count
        })

        return res.status(Number(response.statusCode)).json(response)
    } catch(err: any) {
        next(err)
    }
}