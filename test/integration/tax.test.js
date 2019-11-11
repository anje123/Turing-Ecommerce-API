import request from "supertest";
let server;

describe("/tax", () => {
  beforeEach(async () => {
    server = require("../../index");
  });

  afterAll(async () => {
    await server.close();
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  describe("GET /tax", () => {
    it("respond with json containing a list of all taxes", async () => {
      const res = await request(server).get("/tax");
      expect(res.status).toBe(200);
    });
  });

  describe("GET /tax/:tax_id", () => {
    it("respond with json containing a tax based on its id", async () => {
      const res = await request(server).get("/tax/1");
      expect(res.status).toBe(200);
    });

    it("should return status code 404 if tax with the id is not found", async () => {
      const res = await request(server).get("/tax/notfound");
      expect(res.status).toBe(404);
    });
  });
});
