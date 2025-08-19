import type { Request, Response, NextFunction } from "express";
export interface AppError extends Error {
    status?: number;
}
export declare const ErrorHandler: (req: Request, res: Response, next: NextFunction, err: AppError) => Response<any, Record<string, any>>;
//# sourceMappingURL=ErrorHandler.d.ts.map