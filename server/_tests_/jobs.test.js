import request from "supertest";
import app from "../server.js";

describe("Jobs API", () => {
    it("GET /api/jobs should return all jobs", async () => {
        const res = await request(app).get("/api/jobs");
        expect(res.statusCode).toBe(200);
    });
});
