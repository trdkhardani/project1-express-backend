import { PrismaClient } from "../../generated/prisma";
import { internalServerErrorResponse, successResponse } from "../../utils/response.utils";
const prisma = new PrismaClient();

export async function showtimeSeats(showtimeId: string) {
    try {
        const unavailableSeats = await prisma.bookingSeat.findMany({
            select: {
                seat_id: true,
                booking: {
                    select: {
                        showtime_id: true
                    }
                },
                seat: {
                    select: {
                        theater_id: true
                    }
                }
            },
            where: {
                booking: {
                    showtime_id: showtimeId,
                    OR: [
                        {
                            booking_payment_status: "PENDING"
                        },
                        {
                            booking_payment_status: "SUCCESSFUL"
                        },
                    ]
                }
            }
        })

        const showtime =  await prisma.showtime.findFirst({
            select: {
                theater_id: true,
                movie: {
                    select: {
                        movie_title: true,
                        movie_poster: true
                    }
                },
                theater: {
                    select: {
                        theater_location: true,
                        theater_city: true,
                    }
                }
            },
            where: {
                showtime_id: showtimeId
            }
        })

        const seat = await prisma.seat.findMany({
            where: {
                theater_id: showtime?.theater_id as string,
            }
        })

        const seats = seat.map((seat) => {
            let isSeatAvailable = true;
            unavailableSeats.map((unavailableSeat) => {
                if(unavailableSeat.seat_id === seat.seat_id && unavailableSeat.booking.showtime_id === showtimeId){
                    isSeatAvailable = false;
                }

                return isSeatAvailable;
            })

            return {
                seat_id: seat.seat_id,
                seat_position: `${seat.seat_row}${seat.seat_number}`,
                theater_id: seat.theater_id,
                is_seat_available: isSeatAvailable
            }
        })

        return successResponse({
            movie: {
                movie_title: showtime?.movie.movie_title,
                movie_poster: showtime?.movie.movie_poster
            },
            theater: {
                theater_location: showtime?.theater.theater_location,
                theater_city: showtime?.theater.theater_city,
            },
            unavailableSeats,
            seats
        })
    } catch(err: any) {
        console.error(err);
        return internalServerErrorResponse();
    }
}