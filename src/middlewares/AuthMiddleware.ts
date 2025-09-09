import type { Request, Response, NextFunction } from "express";
import { forbiddenResponse, unauthorizedResponse } from "../utils/response.utils";
import jwt, { JsonWebTokenError, TokenExpiredError, type JwtPayload } from "jsonwebtoken";
import { UserRole, type UserDataPayload } from "../models/user";
import type { AdminDataPayload } from "../models/admin";
import type { AuthenticatedRequest } from "../models/auth";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string; 

export class AuthMiddleware {
    static async user(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        let response;
        try {
            const { authorization } = req.headers;

            if(!authorization || !authorization.startsWith('Bearer')) {
                response = await unauthorizedResponse();
                return res.status(Number(response.statusCode)).json(response);
            }

            const token = authorization?.split(' ')[1] as string

            const decoded = jwt.verify(token, JWT_SECRET_KEY) as UserDataPayload
            req.user = {
                user_id: decoded.user_id,
                user_email: decoded.user_email,
                user_username: decoded.user_username,
                user_name: decoded.user_name,
                user_role: decoded.user_role
            }
            next();
        } catch(err: TokenExpiredError | any) {
            if(err) {
                response = await unauthorizedResponse(err.message);
                return res.status(Number(response.statusCode)).json(response);
            }
            next(err)
        }
    }
    
    static async admin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        let response;
        try {
            const { authorization } = req.headers;

            if(!authorization || !authorization.startsWith('Bearer')) {
                response = await unauthorizedResponse();
                return res.status(Number(response.statusCode)).json(response);
            }

            const token = authorization?.split(' ')[1] as string

            const decoded = jwt.verify(token, JWT_SECRET_KEY) as AdminDataPayload

            if(decoded.user_role === UserRole.ADMIN || decoded.user_role === UserRole.SUPERADMIN) {
                req.admin = {
                    admin_id: decoded.admin_id,
                    admin_email: decoded.admin_email,
                    admin_username: decoded.admin_username,
                    user_role: decoded.user_role,
                    cinema_chain_id: decoded.cinema_chain_id || "NULL"
                }
                next();
            } else {
                response = await forbiddenResponse("You are not allowed to access this resource (Admin only)")
                return res.status(response.statusCode).json(response)
            }
        } catch(err: TokenExpiredError | any) {
            if(err) {
                response = await unauthorizedResponse(err.message);
                return res.status(Number(response.statusCode)).json(response);
            }
            next(err)
        }
    }

    static async superadmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        let response;
        try {
            if(req.admin?.user_role === UserRole.SUPERADMIN) {
                next();
            } else {
                response = await forbiddenResponse("You are not allowed to access this resource (Superadmin only)")
                return res.status(response.statusCode).json(response)
            }
        } catch(err: TokenExpiredError | any) {
            if(err) {
                response = await unauthorizedResponse(err.message);
                return res.status(Number(response.statusCode)).json(response);
            }
            next(err)
        }
    }
}