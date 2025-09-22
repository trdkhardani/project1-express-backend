import * as z from 'zod';
import { UserRole } from '../models/user.ts';

export const RegisterUserData = z.object({
    userEmail: z.email("Email must in a valid format"),
    userName: z.coerce.string("Invalid name"),
    userUsername: z.coerce.string("Invalid username").max(15, "Maximum 12 characters for username"),
    userPassword: z.coerce.string("Invalid password").min(8, "Password must consists of 8 characters minimum")
})

export const LoginUserData = z.object({
    userEmail: z.email("Email must in a valid format").optional(),
    userUsername: z.coerce.string().optional(),
    userPassword: z.coerce.string("Invalid password"),
    userRole: z.string().default(UserRole.USER)
})