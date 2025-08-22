import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();
import { Status, type ResponseInterface } from "../../models/response";
import { UserRole, type UserLoginInterface } from "../../models/user";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { unauthorizedResponse } from "../../utils/response.utils";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string

export async function login(loginData: UserLoginInterface):Promise<ResponseInterface<{}>> {
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        user_email: loginData.user_email
                    },
                    {
                        user_username: loginData.user_username
                    }
                ]
            }
        })

        const isPasswordCorrect = await bcrypt.compare(loginData.user_password, user?.user_password as string)

        if(user?.user_status === "UNVERIFIED") {
            return unauthorizedResponse("User email has not been verified yet")
        } else if(!isPasswordCorrect) {
            return unauthorizedResponse("Invalid email/username or password")
        }

        const token = jwt.sign({user_id: user?.user_id, user_username: user?.user_username, user_email: user?.user_email, user_role: UserRole.USER}, JWT_SECRET_KEY, {
            expiresIn: '12h'
        })

        return {
            status: Status.true,
            data: {
                token,
                user
            },
            statusCode: 200,
            message: `Logged in as ${user?.user_name}`
        }
    } catch(err: any) {
        console.error(err)
        return {
            status: Status.false,
            data: null,
            message: "Error"
        }
    }
}