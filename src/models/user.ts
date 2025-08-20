import jwt, { type JwtPayload } from 'jsonwebtoken'

export interface UserRegistrationInterface {
    user_name: string,
    user_username: string,
    user_email: string,
    user_password: string,
    // user_status: UserStatus,
}

export interface UserLoginInterface {
    user_username: string,
    user_email: string,
    user_password: string,
}

export interface UserDataPayload extends jwt.JwtPayload {
    user_id: string,
    user_name: string,
    user_username: string,
    user_email: string,
}

// export let users: User[] = []