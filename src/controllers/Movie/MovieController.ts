import type { NextFunction, Request, Response } from "express";
import * as MovieService from '../../services/Movie/MovieService'

export async function movieList(req: Request, res: Response, next: NextFunction) {
    try {
        const {
            search,
            page,
            limit
        } = req.query

        const response = await MovieService.movieList({
            search: String(search),
            page: Number(page),
            limit: Number(limit)
        });

        return res.json(response)
    } catch(err: any) {
        next(err)
    }
}