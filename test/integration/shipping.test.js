import request from "supertest";
let server;

describe("/shipping", () => {
  beforeEach(async () => {
    server = require("../../index");
  });

  afterAll(async () => {
    await server.close();
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  describe("GET /shipping/regions", () => {
    it("srespond with json containing a list of all shippings", async () => {
      const res = await request(server).get("/shipping/regions");
      expect(res.status).toBe(200);
    });
  });

  describe("GET ​/shipping/regions/:shipping_region_id", () => {
    it("respond with json containing a shipping based on shipping region id", async () => {
      const res = await request(server).get("/shipping/regions/2");
      expect(res.status).toBe(200);
    });

    it("should return status code 404 if region is not found", async () => {
      const res = await request(server).get("/shipping/regions/notfound");
      expect(res.status).toBe(404);
    });
  });
});
