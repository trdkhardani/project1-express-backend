import type { Request, Response, NextFunction } from "express";
import * as RegisterService from "../../services/Auth/RegisterService"

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await RegisterService.register({
            user_email: req.body.user_email,
            user_name: req.body.user_name,
            user_username: req.body.user_username,
            user_password: req.body.user_password
        })

        return res.status(Number(response.statusCode)).json(response)
    } catch(err: any) {
        next(err)
    }
}

export async function verifyUser(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await RegisterService.verifyUser(req.params.tokenizedUserId as string)

        return res.json(response)
    } catch(err) {
        next(err)
    }
}