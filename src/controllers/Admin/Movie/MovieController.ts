import type { NextFunction, Request, Response } from "express";
import { MovieService } from "../../../services/Admin/Movie/MovieService.ts";
import type { AuthenticatedRequest } from "../../../models/auth.ts";
import { CreateMovieData } from "../../../schemas/MovieSchema.ts";
import { ZodError } from "zod";
import { badRequestResponse } from "../../../utils/response.utils.ts";
import { MulterError } from "multer";

export class MovieController {
    static async createMovie(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const {
                movie_title,
                movie_synopsis,
                movie_duration
            } = req.body
            const movie_poster = req.file
            
            if(!movie_poster) {
                const response = await badRequestResponse("Movie poster must not be empty");
                return res.status(response.statusCode).json(response);
            }
            
            const validatedData = CreateMovieData.parse({
                movieTitle: movie_title,
                movieSynopsis: movie_synopsis,
                movieDuration: Number(movie_duration),
            })

            const moviePosterPath = `public/movie_posters/${movie_poster?.originalname}`

            const response = await MovieService.createMovie({
                movie_title: validatedData.movieTitle,
                movie_synopsis: validatedData.movieSynopsis,
                movie_duration: Number(validatedData.movieDuration),
                movie_poster: moviePosterPath
            })

            return res.status(Number(response.statusCode)).json(response);
        } catch(err: any) {
            if(err instanceof ZodError) {
                console.log("zod error: " + err)
                return res.status(400).json(await badRequestResponse(err.issues[0]?.message as string))
            } 
            next(err);
        }
    }
}