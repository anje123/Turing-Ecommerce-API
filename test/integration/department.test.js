import request from "supertest";
let server;

describe("/departments", () => {
  beforeEach(async () => {
    server = require("../../index");
  });

  afterAll(async () => {
    await server.close();
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  describe("GET /departments", () => {
    it("respond with json containing a list of all departments", async () => {
      const res = await request(server)
        .get("/departments")
        .expect("Content-Type", /json/);
      expect(res.status).toBe(200);
    });
  });

  describe("GET /departments/:department_id", () => {
    it("respond with json containing a department with the id given", async () => {
      const res = await request(server)
        .get("/departments/1")
        .expect("Content-Type", /json/);
      expect(res.status).toBe(200);
    });

    it("return status code 404 if not found", async () => {
      const res = await request(server).get("/departments/notfoundid");
      expect(res.status).toBe(404);
    });
  });
});
