import { PrismaClient } from "../../generated/prisma";
import type { BookSeats, SeatSelections } from "../../models/booking";
import type { ResponseInterface } from "../../models/response";
import { badRequestResponse, conflictResponse, internalServerErrorResponse, successResponse } from "../../utils/response.utils";
const prisma = new PrismaClient();

export async function showtimeSeats(showtimeId: string):Promise<ResponseInterface<{}>> {
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

export async function selectSeat(bookSeats: BookSeats):Promise<ResponseInterface<{}>> {
    try {
        const maximumSeats = 5;
        
        const showtimeSeats = await prisma.seat.findMany({
            select: {
                seat_id: true
            },
            where: {
                theater: {
                    showtime: {
                        some: {
                            showtime_id: bookSeats.showtimeId
                        }
                    }
                }
            }
        })

        const isSeatNotExist = () => {
            for(let i = 0; i < bookSeats.selectedSeats.length; i++) {
                // find indexes of the showtime seats and return the results
                const matchTheaterSeats = showtimeSeats.findIndex((showtimeSeat) => {
                    return showtimeSeat.seat_id === bookSeats.selectedSeats[i]?.seat_id
                })

                if(matchTheaterSeats === -1) { // check if there are some showtime seats not found from the selected seat(s)
                    return true 
                }
            }
        }

        // check if the seat is not exist
        if(isSeatNotExist()) {
            return conflictResponse("Some Seat(s) doesn't exist in this showtime's theater")
        }

        // function to check duplicate objects in an array
        const getDuplicates = (arr: object[], key: string) => {
            const keys = arr.map((item: any) => item[key]);
            return keys.filter((key) => keys.indexOf(key) !== keys.lastIndexOf(key));
        };

        if(bookSeats.seatCount > maximumSeats) { // check if seat count has more than maximum seat
            return badRequestResponse(`Maximum of ${maximumSeats} seats allowed`)
        } else if(bookSeats.selectedSeats.length > bookSeats.seatCount) { // check if seat (request body in array of objects) length has more than seat count
            return badRequestResponse(`Choose up to ${bookSeats.seatCount} seat(s) or increase the number of seats. Current selected seat total: ${bookSeats.selectedSeats.length} seats`)
        } else if(bookSeats.selectedSeats.length < bookSeats.seatCount) { // check if seat (request body in array of objects) length has less than seat count
            return badRequestResponse(`Select ${bookSeats.seatCount - bookSeats.selectedSeats.length} more seat(s) or reduce the number of seats`)
        } else if(getDuplicates(bookSeats.selectedSeats, 'seat_id').length > 0) { // if 1 seat_id selected more than one time (duplicate object: same key, same value)
            return badRequestResponse("One seat for one person only")
        }
        
        const reservedSeats = await prisma.bookingSeat.findMany({
            select: {
                seat_id: true,
                seat: {
                    select: {
                        seat_number: true,
                        seat_row: true
                    }
                },
                booking: {
                    select: {
                        showtime_id: true
                    }
                }
            },
            where: {
                booking: {
                    showtime_id: bookSeats.showtimeId,
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

        const checkSeat = bookSeats.selectedSeats.map(seat => {
            // find reserved seat by comparing selected seat_id to bookingSeat seat_id and showtimeId (in path param) to bookingSeat's booking showtime_id
            const conflictingSeat = reservedSeats.find(reservedSeat => {
                return reservedSeat.booking.showtime_id === bookSeats.showtimeId && reservedSeat.seat_id === seat?.seat_id
            })

            if(conflictingSeat){ // if there is conflicting seat found, return seat row(s) and number(s)
                return `${conflictingSeat?.seat.seat_row}${conflictingSeat?.seat.seat_number}`
            }
        })

        const conflictingSeatLabels = checkSeat.filter((seat) => {
            return seat !== undefined // return only labelled seats
        })

        if(conflictingSeatLabels.length === 1) { // if only one conflicting seat found
            return conflictResponse(`Seat ${conflictingSeatLabels[0]} is reserved`)
        } else if(conflictingSeatLabels.length > 1) { // if there are more than one conflicting seat found
            return conflictResponse(`Seats ${conflictingSeatLabels.join(", ")} are reserved`)
        }

        const bookShowtime = await prisma.booking.create({
            data: 
                {
                    booking_payment_status: "PENDING",
                    showtime_id: bookSeats.showtimeId,
                    user_id: bookSeats.userId,
                    booking_seat: {
                        createMany: {
                            data: bookSeats.selectedSeats
                        } 
                    }
                }
        })

        return successResponse(bookShowtime, "Seat selected")
    } catch(err: any) {
        console.error(err);
        return internalServerErrorResponse();
    }
}