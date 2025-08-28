import type { Request, Response, NextFunction } from "express";
import * as SelectSeatService from '../../services/Booking/SelectSeatService'

export async function showtimeSeats(req: Request, res: Response, next: NextFunction) {
    try {
        // const theaterId = req.params.theaterId as string
        const showtimeId = req.params.showtimeId as string

        const response = await SelectSeatService.showtimeSeats(showtimeId)

        return res.json(response)
    } catch(err: any) {
        next(err)
    }
}

export async function pickSeat(req: Request, res: Response, next: NextFunction) {
    try {
        const showtimeId = req.params.showtimeId as string
        const {
            seat_count,
            user_id,
            seats,
        } = req.body
        
        const response = await SelectSeatService.selectSeat({
            showtimeId: showtimeId, 
            selectedSeats: seats, 
            userId: user_id, 
            seatCount: seat_count
        })

        return res.status(Number(response.statusCode)).json(response)
    } catch(err: any) {
        next(err)
    }
}