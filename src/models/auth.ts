// import type { Multer } from "multer";
import type { AdminDataPayload } from "./admin.ts";
import type { UserDataPayload, UserRole } from "./user.ts";
import type { Request } from "express";

export interface UserRegistrationInterface {
    user_name: string,
    user_username: string,
    user_email: string,
    user_password: string,
    // user_status: UserStatus,
}

export interface UserLoginInterface {
    username: string,
    email: string,
    password: string,
    role: UserRole
}

export interface AuthenticatedRequest extends Request {
    user?: UserDataPayload,
    admin?: AdminDataPayload
}