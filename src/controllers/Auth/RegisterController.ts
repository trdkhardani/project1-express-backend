import type { Request, Response, NextFunction } from "express";
import * as RegisterService from "../../services/Auth/RegisterService"
import { RegisterUserData } from "../../schemas/UserSchema";
import { ZodError } from "zod";
import { badRequestResponse } from "../../utils/response.utils";

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const {
            user_email,
            user_name,
            user_username,
            user_password
        } = req.body

        const validatedData = RegisterUserData.parse({
            userEmail: user_email,
            userName: user_name,
            userUsername: user_username,
            userPassword: user_password
        })

        const response = await RegisterService.register({
            user_email: validatedData.userEmail,
            user_name: validatedData.userName,
            user_username: validatedData.userUsername,
            user_password: validatedData.userPassword
        })

        return res.status(Number(response.statusCode)).json(response)
    } catch(err: any) {
        next(err)
        if(err instanceof ZodError) {
            return res.status(400).json(await badRequestResponse(err.issues[0]?.message as string))
        }
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