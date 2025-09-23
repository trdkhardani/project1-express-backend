import { PrismaClient } from "../../../generated/prisma/index.js";
const prisma = new PrismaClient();
import restApp from "../../../app.ts";
import graphqlApp from "../../../graphql/app.ts";
import request from "supertest";
import config from "../../../config/config.ts";

describe('POST /api/v1/admin/theaters', () => {
    it(`should return status code 401`, async () => {
        const res = await request(restApp)
        .post("/api/v1/admin/theaters")

        expect(res.statusCode).toEqual(401);
    })

    it(`should retrun status code 400 and show Zod validation message(s)`, async () => {
        const payload = {
            theater_city: "",
            theater_location: ""
        }

        const res = await request(restApp)
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

        const res = await request(restApp)
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

describe('GraphQL Theaters Query', () => {
    it(`should return list of theaters`, async () => {
        const GET_THEATERS_QUERY = `
            query TheaterList {
                theaters {
                    theater_id
                    cinema_chain_id
                    theater_location
                    theater_city
                }
            }
        `;

        const res = await request(graphqlApp)
        .post("/graphql")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send({
            query: GET_THEATERS_QUERY
        })

        expect(res.statusCode).toBe(200);
        expect(res.body.data.theaters).toEqual(expect.any(Array))
    })

    it(`should return error when theater_id is not provided`, async () => {
        const GET_THEATER_BY_ID_QUERY = `
            query TheaterById {
                theaterById {
                    theater_id
                    cinema_chain_id
                    theater_location
                    theater_city
                }
            }
        `;

        const res = await request(graphqlApp)
        .post("/graphql")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send({
            query: GET_THEATER_BY_ID_QUERY
        })

        expect(res.body.errors[0].message).toEqual("Field \"theaterById\" argument \"theater_id\" of type \"ID!\" is required, but it was not provided.");
    })

    it(`should return error when no matching theater_id is not found`, async () => {
        const GET_THEATER_BY_ID_QUERY = `
            query TheaterById {
                theaterById(theater_id: "sadasdas") {
                    theater_id
                    cinema_chain_id
                    theater_location
                    theater_city
                }
            }
        `;

        const res = await request(graphqlApp)
        .post("/graphql")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send({
            query: GET_THEATER_BY_ID_QUERY
        })

        expect(res.body.errors[0].message).toEqual("Cannot return null for non-nullable field Query.theaterById.");
    })

    it(`should return theater by ID`, async () => {
        const args = `theater_id: "f21893ca-9295-43cf-a85c-dd8242ab4b24"`

        const GET_THEATER_BY_ID_QUERY = `
            query TheaterById {
                    theaterById(${args}) {
                    theater_id
                    cinema_chain_id
                    theater_location
                    theater_city
                }
            }
        `;

        const res = await request(graphqlApp)
        .post("/graphql")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send({
            query: GET_THEATER_BY_ID_QUERY
        })

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toEqual(expect.any(Object));
    })
})

describe('PATCH /api/v1/admin/theaters/{theaterId}', () => {
    it(`should return status code 401`, async () => {
        const res = await request(restApp)
        .patch("/api/v1/admin/theaters/abc")

        expect(res.statusCode).toEqual(401);
    })

    it(`should return status code 200 and successfully update a theater`, async () => {
        const theaterId = "f21893ca-9295-43cf-a85c-dd8242ab4b24"
        const payload = {
            theater_city: "Test Update",
            theater_location: "Test Update"
        }

        const res = await request(restApp)
        .patch(`/api/v1/admin/theaters/${theaterId}`)
        .auth(config.adminToken, {
            type: "bearer"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)

        expect(res.statusCode).toEqual(200);
        expect(res.body.data.theater_city).toEqual(payload.theater_city)

        // revert to the original data when the test is finished
        await prisma.theater.update({
            where: {
                theater_id: theaterId
            },
            data: {
                theater_city: "Surabaya",
                theater_location: "Pakuwon City Mall"
            }
        })
    })
})