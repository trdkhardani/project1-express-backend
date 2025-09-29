import { PrismaClient } from "../../../../generated/prisma/index.js";
const prisma = new PrismaClient();
import restApp from "../../../../app.ts";
import graphqlApp from "../../../../graphql/app.ts";
import request from "supertest";
import config from "../../../../config/config.ts";

const dummyTheater = await prisma.theater.create({
    data: {
        theater_city: "Dummy",
        theater_location: "Dummy",
        cinema_chain_id: "0b19181a-bfaf-4d7f-b791-6e4ef6d36df1"
    }
})

describe("POST /api/v1/admin/seats/{theaterId}", () => {
    it(`should return status code 401`, async () => {
        const res = await request(restApp)
        .post(`/api/v1/admin/seats/${dummyTheater.theater_id}`)

        expect(res.statusCode).toEqual(401);
    })

    it(`should return status code 400 and "No theater found" message`, async () => {
        const payload = {
            seat_rows: 5,
            seats_each_row: 12
        }

        const res = await request(restApp)
        .post("/api/v1/admin/seats/abc")
        .auth(config.adminToken, {
            type: "bearer"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual("No theater found");
    })

    it(`should return status code 400 and show Zod Validation error (NaN values)`, async () => {
        const payload = {
            seat_rows: "5w",
            seats_each_row: "12a"
        }

        const res = await request(restApp)
        .post(`/api/v1/admin/seats/${dummyTheater.theater_id}`)
        .auth(config.adminToken, {
            type: "bearer"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)

        expect(res.statusCode).toEqual(400);
        expect(res.body.message.length).toEqual(2);
    })

    it(`should return status code 400 and show Zod Validation error (under minimum values)`, async () => {
        const payload = {
            seat_rows: 2,
            seats_each_row: 0
        }

        const res = await request(restApp)
        .post(`/api/v1/admin/seats/${dummyTheater.theater_id}`)
        .auth(config.adminToken, {
            type: "bearer"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)

        expect(res.statusCode).toEqual(400);
        expect(res.body.message.length).toEqual(2);
    })

    it(`should return status code 400 and show Zod Validation error (exceeding maximum values)`, async () => {
        const payload = {
            seat_rows: 27,
            seats_each_row: 51
        }

        const res = await request(restApp)
        .post(`/api/v1/admin/seats/${dummyTheater.theater_id}`)
        .auth(config.adminToken, {
            type: "bearer"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)

        expect(res.statusCode).toEqual(400);
        expect(res.body.message.length).toEqual(2);
    })

    it(`should return status code 201 and create new seats data`, async () => {
        const payload = {
            seat_rows: 5,
            seats_each_row: 12
        }

        const res = await request(restApp)
        .post(`/api/v1/admin/seats/${dummyTheater.theater_id}`)
        .auth(config.adminToken, {
            type: "bearer"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)

        expect(res.statusCode).toEqual(201);
        expect(res.body.data.length).toEqual(payload.seat_rows * payload.seats_each_row);
    })
})

describe("PATCH /api/v1/admin/seats/{theaterId}", () => {
    it(`should return status code 401`, async () => {
        const res = await request(restApp)
        .patch(`/api/v1/admin/seats/${dummyTheater.theater_id}`)

        expect(res.statusCode).toEqual(401);
    })

    it(`should return status code 200 and "No theater found or this theater doesn't have seats yet" message`, async () => {
        const payload = {
            seats: [
                {
                    theater_id: dummyTheater.theater_id,
                    seat_row: "F",
                    seat_number: 1
                }
            ]
        }

        const res = await request(restApp)
        .patch("/api/v1/admin/seats/abc")
        .auth(config.adminToken, {
            type: "bearer"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("No theater found or this theater doesn't have seats yet");
    })

    it(`should return status code 400 and "No duplicate seats allowed" message`, async () => {
        const payload = {
            seats: [
                {
                    theater_id: dummyTheater.theater_id,
                    seat_row: "F",
                    seat_number: 1
                },
                {
                    theater_id: dummyTheater.theater_id,
                    seat_row: "F",
                    seat_number: 1
                }
            ]
        }

        const res = await request(restApp)
        .patch(`/api/v1/admin/seats/${dummyTheater.theater_id}`)
        .auth(config.adminToken, {
            type: "bearer"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual("No duplicate seats allowed");
    })

    it(`should return status code 409 and "Cannot add seats with existing row and number" message`, async () => {
        const payload = {
            seats: [
                {
                    theater_id: dummyTheater.theater_id,
                    seat_row: "F",
                    seat_number: 1
                },
                {
                    theater_id: dummyTheater.theater_id,
                    seat_row: "A",
                    seat_number: 4
                }
            ]
        }

        const res = await request(restApp)
        .patch(`/api/v1/admin/seats/${dummyTheater.theater_id}`)
        .auth(config.adminToken, {
            type: "bearer"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)

        expect(res.statusCode).toEqual(409);
        expect(res.body.message).toEqual("Cannot add seats with existing row and number");
    })

    it(`should return status code 201 and append new seats`, async () => {
        const payload = {
            seats: [
                {
                    theater_id: dummyTheater.theater_id,
                    seat_row: "F",
                    seat_number: 1
                },
                {
                    theater_id: dummyTheater.theater_id,
                    seat_row: "F",
                    seat_number: 2
                }
            ]
        }

        const res = await request(restApp)
        .patch(`/api/v1/admin/seats/${dummyTheater.theater_id}`)
        .auth(config.adminToken, {
            type: "bearer"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)

        expect(res.statusCode).toEqual(201);
        expect(res.body.data.length).toEqual(payload.seats.length);

        // delete the dummy theater data after the tests are passed
        await prisma.theater.delete({
            where: {
                theater_id: dummyTheater.theater_id
            }
        })
    })
})