import { PrismaClient } from '../../generated/prisma';
import bcrypt from 'bcrypt';
import jwt, { type JwtPayload } from 'jsonwebtoken'
import type { UserDataPayload, UserRegistrationInterface } from '../../models/user';
import { MailerUtils } from '../../utils/mailer.utils';
import { Status, type ResponseInterface } from '../../models/response';
import { badRequestResponse, conflictResponse, internalServerErrorResponse, successResponse } from '../../utils/response.utils';
const prisma = new PrismaClient();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string

export async function verifyUser(tokenizedUserId: string):Promise<ResponseInterface<{}>>{
    try {
        let userData = jwt.verify(tokenizedUserId, JWT_SECRET_KEY) as UserDataPayload
    
        const user = await prisma.user.update({
            data: {
                user_status: "VERIFIED"
            },
            where: {
                user_id: userData.user_id
            }
        })
    
        return {
            status: Status.true,
            data: null,
            message: `User ${user.user_username} is successfully verified`
        }
    } catch(err: any) {
        console.error(err)
        return internalServerErrorResponse();
    }
}

export async function register(userData: UserRegistrationInterface):Promise<ResponseInterface<{}>>{
    try {
        const hashedPassword = await bcrypt.hash(userData.user_password, 12)
    
        const user = await prisma.user.create({
            data: {
                user_email: userData.user_email,
                user_username: userData.user_username,
                user_name: userData.user_name,
                user_password: hashedPassword
            }
        });
        
        const tokenizedUserId = jwt.sign({user_id: user.user_id}, JWT_SECRET_KEY, {
            expiresIn: '1h'
        })
    
        MailerUtils.sendUserVerificationEmail({
            userEmail: user.user_email,
            userName: user.user_name,
            userId: tokenizedUserId
        })
    
        return {
            status: Status.true,
            statusCode: 201,
            data: user,
            message: "Verification link successfully sent to your email"
        }
    } catch(err: any) {
        if(err.code === "P2002"){
            if(err.meta.target[0] === "user_username") {
                return await conflictResponse("Username already exists")
            } else {
                return await conflictResponse("Email already exists")
            }
        } else {
            console.error(err)
            return internalServerErrorResponse();
        }
    }
};

export async function resendVerification(userEmail: string):Promise<ResponseInterface<{}>> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_email: userEmail
            }
        })

        if(user?.user_status === "VERIFIED") {
            return await conflictResponse(`User with email ${user.user_email} has already been verified`)
        }

        const tokenizedUserId = jwt.sign({user_id: user?.user_id}, JWT_SECRET_KEY, {
            expiresIn: '1h'
        })

        MailerUtils.sendUserVerificationEmail({
            userEmail: user?.user_email as string,
            userName: user?.user_name as string,
            userId: tokenizedUserId
        })

        return successResponse(null, `Verification email resent to ${user?.user_email}`)
    } catch(err: any) {
        console.error(err);
        return internalServerErrorResponse();
    }
}