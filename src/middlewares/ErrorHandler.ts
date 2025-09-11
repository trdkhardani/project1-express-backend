import type { Request, Response, NextFunction } from "express";
import { Status } from "../models/response.ts";
import { badRequestResponse, internalServerErrorResponse } from "../utils/response.utils.ts";
import { MulterError } from "multer";

export interface AppError extends Error {
    status?: number;
}

export const ErrorHandler = async (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)

    let errorResponse = internalServerErrorResponse();
    if(err instanceof MulterError || err instanceof Error) {
        errorResponse = await badRequestResponse(err.message)
        return res.status(errorResponse.statusCode).json(errorResponse)
    }
    return res.status(errorResponse.statusCode).json(errorResponse)
}