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