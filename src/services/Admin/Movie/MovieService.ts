import type { CreateMovieData } from "../../../models/admin";
import type { ResponseInterface } from "../../../models/response";
import { internalServerErrorResponse, successResponse } from "../../../utils/response.utils";
import { PrismaClient } from "../../../generated/prisma";
const prisma = new PrismaClient();

export class MovieService {
    static async createMovie(movieData: CreateMovieData):Promise<ResponseInterface<{}>> {
        try {
            const movie = await prisma.movie.create({
                data: {
                    movie_title: movieData.movie_title,
                    movie_synopsis: movieData.movie_synopsis,
                    movie_duration: movieData.movie_duration,
                    movie_poster: movieData.movie_poster,
                }
            })

            return successResponse(movie, "Movie created")
        } catch(err: any) {
            console.error(err);
            return internalServerErrorResponse();
        }
    } 
}