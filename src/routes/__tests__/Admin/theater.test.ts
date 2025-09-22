import { PrismaClient } from "../../../generated/prisma/index.js";
const prisma = new PrismaClient();
import app from "../../../app.ts";
import request from "supertest";
import config from "../../../config/config.ts";

describe('POST /api/v1/admin/theaters', () => {
    it(`should return status code 401`, async () => {
        const res = await request(app)
        .post("/api/v1/admin/theaters")

        expect(res.statusCode).toEqual(401);
    })

    it(`should retrun status code 400 and show Zod validation message(s)`, async () => {
        const payload = {
            theater_city: "",
            theater_location: ""
        }

        const res = await request(app)
        .post("/api/v1/admin/theaters")
        .auth(config.adminToken, {
            type: "bearer"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual(expect.any(Array))
    })

    it(`should return status code 201 and create new data`, async () => {
        const payload = {
            theater_city: "Test City",
            theater_location: "Test Location"
        }

        const res = await request(app)
        .post("/api/v1/admin/theaters")
        .auth(config.adminToken, {
            type: "bearer"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)

        expect(res.statusCode).toEqual(201);
        expect(res.body.data.theater_city).toEqual(payload.theater_city);
        expect(res.body.message).toEqual("Theater Successfully Added")

        // delete the test data after this test is passed
        await prisma.theater.delete({
            where: {
                theater_id: res.body.data.theater_id
            }
        })
    })
})