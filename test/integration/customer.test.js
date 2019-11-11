import request from "supertest";
let server;

describe("customer", () => {
  beforeAll(() => {
    server = require("../../index");
  });

  afterAll(async () => {
    server.close();
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  describe("PUT /customer", () => {
    it("should return 401 if unauthorized", async () => {
      const res = await request(server)
        .put("/customer")
        .send({ name: "testName", email: "testEmail" });
      expect(res.status).toBe(401);
    });
  });

  describe("GET /customer", () => {
    it("should return 401 if not unauthorized", async () => {
      const res = await request(server).get("/customer");
      expect(res.status).toBe(401);
    });
  });

  describe("POST /customers", () => {
    it("srespond with json containing a list of all customer", async () => {
      const res = await request(server)
        .post("/customers")
        .send({
          name: "testName",
          email: `${Math.random() * 5}testEmail${Math.random() * 5}@gmail.com`,
          password: "123456"
        });
      expect(res.status).toBe(200);
    });

    it("should return status code 400 if input are incorrect", async () => {
      const res = await request(server)
        .post("/customers")
        .send({
          name: "",
          email: `${Math.random() * 5}testEmail${Math.random() * 5}`,
          password: "1"
        });
      expect(res.status).toBe(400);
    });
  });

  describe("POST /customers/login", () => {
    it("should return status code 200 if user is logged in", async () => {
      const response_1 = await request(server)
        .post("/customers")
        .send({
          name: "testName",
          email: `${Math.random() * 5}testEmail${Math.random() * 5}@gmail.com`,
          password: "123456"
        });

      const response_2 = await request(server)
        .post("/customers/login")
        .send({
          email: response_1.body.customer.email,
          password: "123456"
        });

      expect(response_2.status).toBe(200);
    });

    it("should return status code 400 if inputs are incorrect", async () => {
      const res = await request(server)
        .post("/customers/login")
        .send({ email: "testEmail", password: "1" });
      expect(res.status).toBe(400);
    });
  });
});
