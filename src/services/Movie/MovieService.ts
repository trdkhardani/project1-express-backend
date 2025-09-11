import { PrismaClient } from "../../generated/prisma/index.js";
import { movieListQuery } from "../../generated/prisma/sql/movieListQuery.js";
import type { MovieSearch } from "../../models/movie.ts";
const prisma = new PrismaClient();

import { type ResponseInterface } from "../../models/response.ts";
import { internalServerErrorResponse, successResponse } from "../../utils/response.utils.ts";

export async function movieList(movieSearch: MovieSearch):Promise<ResponseInterface<{}>> {
    try {
        const {
            search,
            page,
            limit
        } = movieSearch
    
        const currentDate = new Date();
        const movies = await prisma.$queryRawTyped(movieListQuery(currentDate, `%${search}%`, limit, page))
    
        if(movies.length === 0) {
            return successResponse(null, "No movies found")
        }
    
        return successResponse({
            movies,
            page,
            limit
        });
    } catch(err) {
        console.error(err);
        return internalServerErrorResponse();
    }
}