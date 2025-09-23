import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../../../models/auth.ts";
import { TheaterService } from "../../../services/Admin/Theater/TheaterService.ts";
import { CreateTheaterData } from "../../../schemas/TheaterSchema.ts";
import { ZodError } from "zod";
import { badRequestResponse } from "../../../utils/response.utils.ts";

export class TheaterController {
    static async createTheater(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const {
                theater_city,
                theater_location
            } = req.body

            const validatedData = CreateTheaterData.parse({
                theaterCity: theater_city,
                theaterLocation: theater_location
            })

            const response = await TheaterService.createTheater({
                theaterCity: validatedData.theaterCity,
                theaterLocation: validatedData.theaterLocation,
                cinemaChainId: req.admin?.cinema_chain_id as string
            })

            return res.status(response.statusCode!).json(response)
        } catch(err: any) {
            if(err instanceof ZodError) {
                const response = await badRequestResponse(err.issues)
                return res.status(response.statusCode).json(response)
            }
            next(err)
        }
    }

    static async updateTheater(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const theaterId = req.params.theaterId as string;
            const {
                theater_city,
                theater_location
            } = req.body

            const response = await TheaterService.updateTheater({
                theaterId: theaterId,
                theaterCity: theater_city,
                theaterLocation: theater_location
            })

            return res.status(response.statusCode!).json(response)
        } catch(err: any) {
            next(err)
        }
    }

    static async deleteTheater(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const theaterId = req.params.theaterId as string;

            const response = await TheaterService.deleteTheater(theaterId)

            return res.status(response.statusCode!).json(response)
        } catch(err: any) {
            next(err)
        }
    }
}