import request from "supertest";
import { type } from "os";

let server;

describe("attributes  /", () => {
  beforeAll(() => {
    server = require("../../index");
  });

  afterAll(async () => {
    server.close();
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  describe("GET/ attributes", () => {
    it("respond with json containing a list of all attributes", async () => {
      const res = await request(server)
        .get("/attributes")
        .expect("Content-Type", /json/);
      expect(res.status).toBe(200);
    });
  });

  describe("GET /attributes/:attribute_id", () => {
    it("respond with json containing an attribute with the id given", async () => {
      const res = await request(server)
        .get("/attributes/2")
        .expect("Content-Type", /json/);
      expect(res.status).toBe(200);
    });

    it("should return status code 404 if attribute is not found ", async () => {
      const res = await request(server).get("/attributes/notfoundid");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /attributes/values/:attribute_id", () => {
    it("respond with json containing a list of all value of attributes with the given id", async () => {
      const res = await request(server)
        .get("/attributes/values/2")
        .expect("Content-Type", /json/);
      expect(res.status).toBe(200);
    });

    it("should return status code 404 if value of attributes is not found", async () => {
      const res = await request(server).get("/attributes/values/notfoundid");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /attributes/inProduct/:product_id", () => {
    it("respond with json containing a list of all attributes with the product id", async () => {
      const res = await request(server)
        .get("/attributes/inProduct/2")
        .expect("Content-Type", /json/);
      expect(res.status).toBe(200);
    });

    it("should return status code 404 if all attributes with product id is not found", async () => {
      const res = await request(server).get("/attributes/inProduct/notfoundid");
      expect(res.status).toBe(404);
    });
  });
});
