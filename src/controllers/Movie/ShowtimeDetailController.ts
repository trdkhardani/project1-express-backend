import type { NextFunction, Request, Response } from "express";
import * as ShowtimeDetailService from '../../services/Movie/ShowtimeDetailService'

export async function showtimeDetail(req: Request, res: Response, next: NextFunction) {
    try {
        const movieId = req.params.movieId as string
        const {
            theater_id,
            
        } = req.query 

        const response = await ShowtimeDetailService.showtimeDetail(movieId, theater_id as string)

        return res.json(response);
    } catch(err: any) {
        next(err)
    }
}