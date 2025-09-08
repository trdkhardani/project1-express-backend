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
            user_password,
            user_role
        } = req.body
    
        const validatedData = LoginUserData.parse({
            userEmail: user_email,
            userUsername: user_username,
            userPassword: user_password,
            userRole: user_role
        })

        let response;
        if(validatedData.userRole.toLowerCase() === UserRole.ADMIN || validatedData.userRole.toLowerCase() === UserRole.SUPERADMIN) {
            response = await LoginService.loginAdmin({
                email: validatedData.userEmail as string,
                username: validatedData.userUsername as string,
                password: validatedData.userPassword,
                role: validatedData.userRole as UserRole
            })
        } else {
            response = await LoginService.loginUser({
                email: validatedData.userEmail as string,
                username: validatedData.userUsername as string,
                password: validatedData.userPassword,
                role: UserRole.USER
            })
        }


        return res.status(Number(response.statusCode)).json(response)
    } catch(err) {
        next(err)
        if(err instanceof ZodError) {
            return res.status(400).json(await badRequestResponse(err.issues[0]?.message as string))
        }
    }
}