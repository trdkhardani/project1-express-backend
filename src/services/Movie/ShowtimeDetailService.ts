import { PrismaClient } from "../../generated/prisma";
import { internalServerErrorResponse, successResponse } from "../../utils/response.utils";
const prisma = new PrismaClient();

export async function showtimeDetail(movieId: string, theaterId: string) {
    try {
        const movie = await prisma.movie.findUnique({
            where: {
                movie_id: movieId,
            },
        })

        const theaters = await prisma.theater.findMany({
            select: {
                theater_id: true,
                theater_location: true,
                theater_city: true,
                // showtime: true,
            },
            where: {
                showtime: {
                    some: {
                        movie_id: movieId
                    }
                }
            },
            orderBy: {
                theater_location: 'asc'
            }
        })

        const showtimeDetail = await prisma.showtime.findMany({
            select: {
                movie: {
                    select: {
                        movie_id: true
                    }
                },
                theater: {
                    select: {
                        theater_id: true,
                        theater_location: true,
                        theater_city: true,
                    }
                },
                showtime_id: true,
                showtime_price: true,
                showtime_start_date: true
            },
            // distinct: ['movie_id'],
            where: {
                movie_id: movieId,
                theater_id: theaterId,
                // showtime_start_date: {
                //     gte: "2025-09-05T00:00:00.000Z",
                //     lt: "2025-09-06T00:00:00.000Z"
                // }
            }
        })

        return successResponse({
            movie,
            theaters,
            showtime_detail: showtimeDetail
        })
    } catch(err) {
        console.error(err);
        return internalServerErrorResponse();
    }
}