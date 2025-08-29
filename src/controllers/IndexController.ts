import type { Request, Response, NextFunction } from "express";
import { Status, type ResponseInterface } from "../models/response.js";

export const index = (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = {
            status: Status.true,
            data: null,
            message: "It works!"
        }

        return res.json(response)
    } catch(err) {
        next(err)
    }
}