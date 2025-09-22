import app from "../../app.ts";
import request from "supertest";

describe("GET /", () => {
    it(`Returns status code 200 and "It works!" message`, async () => {
        const res = await request(app)
        .get("/")

        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toEqual("It works!")
    })

})