import type { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
    status?: number;
}

export const ErrorHandler = (req: Request, res: Response, next: NextFunction, err: AppError) => {
    console.error(err)
    return res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    })
}