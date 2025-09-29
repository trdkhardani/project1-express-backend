import { PrismaClient } from "../../../generated/prisma/index.js";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/runtime/library.js";
import type { ResponseInterface } from "../../../models/response.ts";
import type { CreateSeatsData, AppendSeatsData, DeleteSeatsData } from "../../../models/seat.ts";
import { badRequestResponse, conflictResponse, createdResponse, internalServerErrorResponse, successResponse } from "../../../utils/response.utils.ts";
const prisma = new PrismaClient();

export class SeatService {
    static async createSeats(seatData: CreateSeatsData):Promise<ResponseInterface<{}>> {
        try {
            const theaterSeatsCount = await prisma.seat.count({
                where: {
                    theater_id: seatData.theaterId
                }
            })

            if(theaterSeatsCount > 0) {
                return badRequestResponse(`Theater with ID ${seatData.theaterId} already has seats`)
            }

            const seats = [];
            
            for(let i = 1; i <= seatData.seatRows; i++) {
                for(let j = 1; j <= seatData.seatsEachRow; j++) {
                    let Ascii_A = 64+i // starts from ascii code 65 (letter A)
                    seats.push({
                        theater_id: seatData.theaterId,
                        seat_row: String.fromCharCode(Ascii_A),
                        seat_number: j
                    })
                }
            }

            await prisma.seat.createMany({
                data: seats
            })

            return createdResponse(seats, "Seats created")
        } catch(err) {
            if(err instanceof PrismaClientKnownRequestError) {
                if(err.code === "P2003") {
                    return badRequestResponse("No theater found")
                }
            }
            console.error(err);
            return internalServerErrorResponse();
        }
    }

    static async appendSeats(seatData: AppendSeatsData):Promise<ResponseInterface<{}>> {
        try {
            const existingSeats = await prisma.seat.findMany({
                select: {
                    theater_id: true,
                    seat_row: true,
                    seat_number: true
                },
                where: {
                    theater_id: seatData.theaterId
                }
            });

            if(existingSeats.length === 0) {
                return successResponse(null, "No theater found or this theater doesn't have seats yet")
            }

            const mapExistingSeats = existingSeats.map((seat) => {
                return `${seat.seat_row}${seat.seat_number}`
            })

            const mapSeatsInput = seatData.seats.map((seat) => {
                return `${seat.seat_row}${seat.seat_number}`
            })

            for(let i = 0; i < mapExistingSeats.length; i++) {
                if(mapExistingSeats.indexOf(mapSeatsInput[i] as string) !== -1) {
                    return conflictResponse("Cannot add seats with existing row and number")
                }
            }

            for(let i = 0; i < mapSeatsInput.length; i++) {
                if(mapSeatsInput.filter(seat => seat === mapSeatsInput[i]).length > 1) {
                    return badRequestResponse("No duplicate seats allowed")
                }
            }

            await prisma.seat.createMany({
                data: seatData.seats
            })

            return createdResponse(seatData.seats, "Seats successfully appended")
        } catch(err: any) {
            console.error(err);
            return internalServerErrorResponse();
        }
    }

    static async deleteSeat(seatData: DeleteSeatsData):Promise<ResponseInterface<{}>> {
        try {
            const deleteSeat = await prisma.seat.delete({
                where: {
                    theater_id: seatData.theaterId,
                    seat_id: seatData.seats
                }
            })

            return successResponse(deleteSeat, "Seat successfully deleted")
        } catch(err: any) {
            if(err instanceof PrismaClientKnownRequestError) {
                if(err.code === "P2025") {
                    return successResponse(null, err.meta?.cause as string)
                }
            }
            console.error(err);
            return internalServerErrorResponse();
        }
    }
}