import request from "supertest";
let server;

describe("category", () => {
  beforeAll(() => {
    server = require("../../index");
  });

  afterAll(async () => {
    await server.close();
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  describe("GET /categories", () => {
    it("respond with json containing a list of all categories", async () => {
      const res = await request(server)
        .get("/categories")
        .expect("Content-Type", /json/);
      expect(res.status).toBe(200);
    });
  });

  describe("GET /categories/:category_id", () => {
    it("respond with json containing a category with the given id", async () => {
      const res = await request(server)
        .get("/categories/1")
        .expect("Content-Type", /json/);

      expect(res.status).toBe(200);
    });

    it("should return status code 404 if data not found", async () => {
      const res = await request(server).get("/categories/notfoundid");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /categories/inProduct/:product_id", () => {
    it("respond with json containing a list categories of a product of the id given", async () => {
      const res = await request(server)
        .get("/categories/inProduct/1")
        .expect("Content-Type", /json/);
      expect(res.status).toBe(200);
    });

    it("should return status code 404 if data not not found", async () => {
      const res = await request(server).get("/categories/inProduct/notfoundid");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /categories/inDepartment/:department_id", () => {
    it("respond with json containing categories of a department of the id given", async () => {
      const res = await request(server)
        .get("/categories/inDepartment/2")
        .expect("Content-Type", /json/);
      expect(res.status).toBe(200);
    });

    it("should return 404 if data is sent not back", async () => {
      const res = await request(server).get(
        "/categories/inDepartment/notfoundid"
      )
      expect(res.status).toBe(404);
    });
  });
});
