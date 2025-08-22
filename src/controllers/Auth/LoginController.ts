import type { NextFunction, Request, Response } from "express";
import { LoginUserData } from "../../schemas/UserSchema";
import * as LoginService from "../../services/Auth/LoginService"
import { UserRole } from "../../models/user";
import { ZodError } from "zod";
import { badRequestResponse } from "../../utils/response.utils";

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const {
            user_email,
            user_username,
            user_password
        } = req.body
    
        const validatedData = LoginUserData.parse({
            userEmail: user_email,
            userUsername: user_username,
            userPassword: user_password
        })

        const response = await LoginService.login({
            user_email: validatedData.userEmail as string,
            user_username: validatedData.userUsername as string,
            user_password: validatedData.userPassword,
            user_role: UserRole.USER
        })

        return res.status(Number(response.statusCode)).json(response)
    } catch(err) {
        next(err)
        if(err instanceof ZodError) {
            return res.status(400).json(await badRequestResponse(err.issues[0]?.message as string))
        }
    }
}