import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();
import { Status, type ResponseInterface } from "../../models/response";
import { UserRole } from "../../models/user";
import { type UserLoginInterface } from "../../models/auth";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { internalServerErrorResponse, successResponse, unauthorizedResponse } from "../../utils/response.utils";

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

        const token = jwt.sign({user_id: user?.user_id, user_name: user.user_name, user_username: user?.user_username, user_email: user?.user_email, user_role: UserRole.USER}, JWT_SECRET_KEY, {
            expiresIn: '12h'
        })

        return successResponse({
            user,
            token
        }, `Logged in as user ${user?.user_username}`)
    } catch(err: any) {
        console.error(err)
        return internalServerErrorResponse();
    }
}

export async function loginAdmin(loginData: UserLoginInterface): Promise<ResponseInterface<{}>> {
    try {
        let admin: any;
        let userRole: UserRole;
        if(loginData.role.toLowerCase() === UserRole.SUPERADMIN) {
            userRole = UserRole.SUPERADMIN
            admin = await prisma.superadmin.findFirst({
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
        } else {
            userRole = UserRole.ADMIN
            admin = await prisma.admin.findFirst({
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
        }

        if(!admin) {
            return unauthorizedResponse("Invalid email/username or password")
        }

        const isPasswordCorrect = await bcrypt.compare(loginData.password, admin?.admin_password as string)

        if(!isPasswordCorrect) {
            return unauthorizedResponse("Invalid email/username or password")
        }

        const token = jwt.sign({admin_id: admin?.admin_id, admin_username: admin?.admin_username, admin_email: admin?.admin_email, user_role: userRole, cinema_chain_id: admin?.cinema_chain_id || "NULL"}, JWT_SECRET_KEY, {
            expiresIn: '12h'
        })

        return successResponse({
            admin,
            token
        }, `Logged in as Admin ${admin?.admin_username}`)
    } catch(err: any) {
        console.error(err)
        return internalServerErrorResponse();
    }
}