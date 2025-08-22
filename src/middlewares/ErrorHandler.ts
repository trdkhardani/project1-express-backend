import type { Request, Response, NextFunction } from "express";
import { Status } from "../models/response";

export interface AppError extends Error {
    status?: number;
}

export const ErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    return res.status(err.status || 500).json({
        status: Status.false,
        message: err.message || "Internal Server Error"
    })
}