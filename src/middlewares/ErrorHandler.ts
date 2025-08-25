import type { Request, Response, NextFunction } from "express";
import { Status } from "../models/response";
import { internalServerErrorResponse } from "../utils/response.utils";

export interface AppError extends Error {
    status?: number;
}

export const ErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)

    const errorResponse = internalServerErrorResponse();
    return res.status(errorResponse.statusCode).json(errorResponse)
}