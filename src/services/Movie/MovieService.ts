import { PrismaClient } from "../../generated/prisma";
import { movieListQuery } from "../../generated/prisma/sql";
import type { MovieSearch } from "../../models/movie";
const prisma = new PrismaClient();

import { type ResponseInterface } from "../../models/response";
import { internalServerErrorResponse, successResponse } from "../../utils/response.utils";

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