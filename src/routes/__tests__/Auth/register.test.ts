import restApp from "../../../app.ts";
import request from "supertest";
import { PrismaClient } from "../../../generated/prisma/index.js";
const prisma = new PrismaClient();
import { Status } from "../../../models/response.ts";
import type { App } from "supertest/types.js";
import jwt from "jsonwebtoken";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string

const dummyUserData = await prisma.user.create({
    data: {
        user_email: 'existing@mail.com',
        user_name: 'Existing User',
        user_username: 'ExistUser',
        user_password: 'PretendThisIsHashed',
        user_status: 'VERIFIED'
    }
});

const userVerificationTestData = await prisma.user.create({
    data: {
        user_email: 'verify@mail.com',
        user_name: 'Verification Test',
        user_username: 'VerifTest',
        user_password: 'PretendThisIsHashed',
        user_status: 'UNVERIFIED'
    }
});

afterAll(async () => {
    await prisma.user.deleteMany({
        where: {
            user_name: "Test Successful Registration"
        }
    });

    await prisma.user.delete({
        where: {
            user_id: dummyUserData.user_id
        }
    });
        
    await prisma.user.delete({
        where: {
            user_id: userVerificationTestData.user_id
        }
    });
})

async function sendRegister(app: App, payload: object) {
    const res = await request(app)
        .post("/api/v1/auth/register")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload);

    return res;
} 

describe("POST /api/v1/auth/register", () => {
    it("should return status code 409 and show 'Email already exists' message", async () => {
        const payload = {
            user_email: "existing@mail.com",
            user_name: "conflict test",
            user_username: "conflicttest",
            user_password: "conflict123"
        };

        const res = await sendRegister(restApp, payload);

        expect(res.body.status).toBe(Status.false);
        expect(res.statusCode).toEqual(409);
        expect(res.body.data).toBe(null);
        expect(res.body.message).toBe('Email already exists');
    });

    it("should return status code 409 and show 'Username already exists' message", async () => {
        const payload = {
            user_email: "test@mail.com",
            user_name: "conflict test",
            user_username: "ExistUser",
            user_password: "conflict123"
        };

        const res = await sendRegister(restApp, payload);

        expect(res.body.status).toBe(Status.false);
        expect(res.statusCode).toEqual(409);
        expect(res.body.data).toBe(null);
        expect(res.body.message).toBe('Username already exists');
    });

    it("should return status code 400 and show fields validation messages", async () => {
        const payload = {
            user_email: "falseemail.com",
            user_name: "error test",
            user_username: "errortest12345678",
            user_password: "gao123"
        };

        const res = await sendRegister(restApp, payload);

        expect(res.body.status).toBe(Status.false);
        expect(res.statusCode).toEqual(400);
        expect(res.body.data).toBe(null);
        expect(res.body.message[0].message).toBe('Email must in a valid format');
        expect(res.body.message[1].message).toBe('Maximum 12 characters for username');
        expect(res.body.message[2].message).toBe('Password must consists of 8 characters minimum');
    });

    it("should return successful registration", async () => {
        const payload = {
            user_email: "test@mail.com",
            user_name: "Test Successful Registration",
            user_username: "test",
            user_password: "test1234",
        };

        const res = await sendRegister(restApp, payload);

        expect(res.body.status).toBe(Status.true);
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe("Verification link successfully sent to your email");
    })
});

describe("GET /api/v1/auth/register/verify/{tokenizedUserId}", () => {
    it("should show successful verification", async () => {
        const tokenizedUserId = jwt.sign({user_id: userVerificationTestData.user_id}, JWT_SECRET_KEY, {
            expiresIn: '1h'
        });

        const res = await request(restApp)
        .get(`/api/v1/auth/register/verify/${tokenizedUserId}`);

        expect(res.body.status).toBe(Status.true);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBe(null);
        expect(res.body.message).toBe(`User ${userVerificationTestData.user_username} is successfully verified`);
    })
});

describe("POST /api/v1/auth/register/resend-verification", () => {
    it("should return email verification failed to resent because the user is already verified", async () => {
        const payload = {
            user_email: userVerificationTestData.user_email
        };
        
        const res = await request(restApp)
        .post("/api/v1/auth/register/resend-verification")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload);

        expect(res.body.status).toBe(Status.false);
        expect(res.statusCode).toEqual(409);
        expect(res.body.data).toBe(null);
        expect(res.body.message).toBe(`User with email ${userVerificationTestData.user_email} has already been verified`);
    });
    
    it("should resend verification email", async () => {
        await prisma.user.update({
            where: {
                user_id: userVerificationTestData.user_id
            },
            data: {
                user_status: 'UNVERIFIED'
            }
        });

        const payload = {
            user_email: userVerificationTestData.user_email
        };
        
        const res = await request(restApp)
        .post("/api/v1/auth/register/resend-verification")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload);

        expect(res.body.status).toBe(Status.true);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBe(null);
        expect(res.body.message).toBe(`Verification email resent to ${userVerificationTestData?.user_email}`);
    });
});