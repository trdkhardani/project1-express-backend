import type { CreateMovieData, UpdateMovieData } from "../../../models/admin.ts";
import type { ResponseInterface } from "../../../models/response.ts";
import { internalServerErrorResponse, successResponse } from "../../../utils/response.utils.ts";
import { PrismaClient } from "../../../generated/prisma/index.js";
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

    static async updateMovie(movieData: UpdateMovieData):Promise<ResponseInterface<{}>> {
        try {
            const updateMovie = await prisma.movie.update({
                where: {
                    movie_id: movieData.movie_id
                },
                data: {
                    movie_title: movieData.movie_title as string,
                    movie_synopsis: movieData.movie_synopsis as string,
                    movie_duration: movieData.movie_duration as number,
                    movie_poster: movieData.movie_poster as string,
                }
            })

            return successResponse(updateMovie, `Movie with ID ${updateMovie.movie_id} successfully updated`)
        } catch(err: any) {
            console.error(err);
            return internalServerErrorResponse();
        }
    }
}