import { PrismaClient } from "../../../generated/prisma/index.js";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/runtime/library.js";
import type { ResponseInterface } from "../../../models/response.ts";
import type { CreateTheaterData, UpdateTheaterData } from "../../../models/theater.ts";
import { badRequestResponse, createdResponse, internalServerErrorResponse, successResponse } from "../../../utils/response.utils.ts";
const prisma = new PrismaClient();

export class TheaterService {
    static async createTheater(theaterData: CreateTheaterData):Promise<ResponseInterface<{}>> {
        try {
            const theater = await prisma.theater.create({
                data: {
                    theater_city: theaterData.theaterCity,
                    theater_location: theaterData.theaterLocation,
                    cinema_chain_id: theaterData.cinemaChainId
                }
            })
            
            return createdResponse(theater, "Theater Successfully Added")
        } catch(err: any) {
            console.error(err);
            return internalServerErrorResponse();
        }
    }

    static async updateTheater(theaterData: UpdateTheaterData):Promise<ResponseInterface<{}>> {
        try {
            const theater = await prisma.theater.update({
                where: {
                    theater_id: theaterData.theaterId
                },
                data: {
                    theater_city: theaterData.theaterCity as string,
                    theater_location: theaterData.theaterLocation as string
                }
            })

            return successResponse(theater, "Theater Successfully Updated")
        } catch(err: any) {
            if(err instanceof PrismaClientKnownRequestError) {
                if(err.code === "P2025") {
                    return badRequestResponse(`No theater found`)
                }
            }
            console.error(err)
            return internalServerErrorResponse();
        }
    }

    static async deleteTheater(theaterId: string):Promise<ResponseInterface<{}>> {
        try {
            const theater = await prisma.theater.delete({
                where: {
                    theater_id: theaterId
                }
            })

            return successResponse(theater, "Theater Successfully Deleted")
        } catch(err: any) {
            if(err instanceof PrismaClientKnownRequestError) {
                if(err.code === "P2025") {
                    return badRequestResponse(`No theater found`)
                }
            }
            console.error(err);
            return internalServerErrorResponse();
        }
    }
}