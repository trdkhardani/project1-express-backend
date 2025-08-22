import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();
import { Status, type ResponseInterface } from "../../models/response";
import { UserRole, type UserLoginInterface } from "../../models/user";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { successResponse, unauthorizedResponse } from "../../utils/response.utils";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string

export async function loginUser(loginData: UserLoginInterface):Promise<ResponseInterface<{}>> {
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        user_email: loginData.email
                    },
                    {
                        user_username: loginData.username
                    }
                ]
            }
        })

        if(!user) {
            return unauthorizedResponse("Invalid email/username or password")
        }

        const isPasswordCorrect = await bcrypt.compare(loginData.password, user?.user_password as string)

        if(user?.user_status === "UNVERIFIED") {
            return unauthorizedResponse("User email has not been verified yet")
        } else if(!isPasswordCorrect) {
            return unauthorizedResponse("Invalid email/username or password")
        }

        const token = jwt.sign({user_id: user?.user_id, user_username: user?.user_username, user_email: user?.user_email, user_role: UserRole.USER}, JWT_SECRET_KEY, {
            expiresIn: '12h'
        })

        return successResponse({
            user,
            token
        }, `Logged in as user ${user?.user_username}`)
    } catch(err: any) {
        console.error(err)
        return {
            status: Status.false,
            statusCode: 418,
            data: null,
            message: "Error"
        }
    }
}

export async function loginAdmin(loginData: UserLoginInterface): Promise<ResponseInterface<{}>> {
    try {
        const admin = await prisma.admin.findFirst({
            where: {
                OR: [
                    {
                        admin_email: loginData.email
                    },
                    {
                        admin_username: loginData.username
                    }
                ]
            }
        })

        if(!admin) {
            return unauthorizedResponse("Invalid email/username or password")
        }

        const isPasswordCorrect = await bcrypt.compare(loginData.password, admin?.admin_password as string)

        if(!isPasswordCorrect) {
            return unauthorizedResponse("Invalid email/username or password")
        }

        const token = jwt.sign({admin_id: admin?.admin_id, admin_username: admin?.admin_username, admin_email: admin?.admin_email, user_role: UserRole.ADMIN, cinema_chain_id: admin?.cinema_chain_id}, JWT_SECRET_KEY, {
            expiresIn: '12h'
        })

        return successResponse({
            admin,
            token
        }, `Logged in as Admin ${admin?.admin_username}`)
    } catch(err: any) {
        console.error(err)
        return {
            status: Status.false,
            statusCode: 418,
            data: null,
            message: err.message
        }
    }
}