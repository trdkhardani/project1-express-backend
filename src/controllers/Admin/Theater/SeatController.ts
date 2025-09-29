import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../../../models/auth.ts";
import { SeatService } from "../../../services/Admin/Theater/SeatService.ts";
import { CreateTheaterData } from "../../../schemas/TheaterSchema.ts";
import { ZodError } from "zod";
import { badRequestResponse } from "../../../utils/response.utils.ts";
import { CreateSeatSchema } from "../../../schemas/SeatSchema.ts";

export class SeatController {
    static async createSeats(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const theaterId = req.params.theaterId as string;
            const {
                seat_rows,
                seats_each_row
            } = req.body

            const validatedData = CreateSeatSchema.parse({
                theaterId: theaterId,
                seatRows: Number(seat_rows),
                seatsEachRow: Number(seats_each_row)
            })

            const response = await SeatService.createSeats({
                theaterId: validatedData.theaterId,
                seatRows: validatedData.seatRows,
                seatsEachRow: validatedData.seatsEachRow
            })

            return res.status(response.statusCode!).json(response)
        } catch(err: any) {
            if(err instanceof ZodError) {
                const response = await badRequestResponse(err.issues);
                return res.status(response.statusCode).json(response)
            }
            next(err);
        }
    }

    static async appendSeats(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const theaterId = req.params.theaterId as string;
            const seats = req.body.seats

            const response = await SeatService.appendSeats({
                theaterId: theaterId,
                seats: seats,
            })

            return res.status(response.statusCode!).json(response)
        } catch(err: any) {
            next(err)
        }
    }

    static async deleteSeat(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const theaterId = req.params.theaterId as string;
            const seat_id = req.query.seat_id

            const response = await SeatService.deleteSeat({
                theaterId: theaterId,
                seats: Number(seat_id)
            })

            return res.status(response.statusCode!).json(response)
        } catch(err: any) {
            next(err)
        }
    }
}