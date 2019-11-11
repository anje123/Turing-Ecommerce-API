import request from "supertest";

let server;

describe("order /", () => {
  beforeAll(() => {
    server = require("../../index");
  });

  afterAll(async () => {
    server.close();
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  describe("POST /orders", () => {
    it("respond with json containing a list of all orders", async () => {
      const response_1 = await request(server)
        .post("/customers/login")
        .send({
          email: "femi123423@gmail.com",
          password: "12345"
        });

      const response_2 = await request(server)
        .post("/orders")
        .set("USER-KEY", response_1.body.accessToken)
        .send({ cart_id: "1", shipping_id: 2, tax_id: 2 });

      expect(response_2.status).toBe(200);
    });

    it("should return status code 400 if inputs are incorrect", async () => {
      const response_1 = await request(server)
        .post("/customers/login")
        .send({
          email: "femi123423@gmail.com",
          password: "12345"
        });

      const response_2 = await request(server)
        .post("/orders")
        .set("USER-KEY", response_1.body.accessToken)
        .send({ cart_id: 1, shipping_id: "", tax_id: "notax" });

      expect(response_2.status).toBe(400);
    });

    it("should return status code 401 if unauthorized", async () => {
      const res = await request(server)
        .post("/orders")
        .send({ cart_id: "1", shipping_id: 2, tax_id: 2 });

      expect(res.status).toBe(401);
    });
  });

  describe("GET /orders/:order_id", () => {
    it("respond with json containing an order based on the id", async () => {
      const response_1 = await request(server)
        .post("/customers/login")
        .send({
          email: "femi123423@gmail.com",
          password: "12345"
        });

      const response_2 = await request(server)
        .get("/orders/1")
        .set("USER-KEY", response_1.body.accessToken);
      expect(response_2.status).toBe(200);
    });

    it("should return status code 404 if data is not found", async () => {
      const response_1 = await request(server)
        .post("/customers/login")
        .send({
          email: "femi123423@gmail.com",
          password: "12345"
        });

      const response_2 = await request(server)
        .get("/orders/notfound")
        .set("USER-KEY", response_1.body.accessToken);
      expect(response_2.status).toBe(200);
    });

    it("should return status code 401 if unauthorized", async () => {
      const res = await request(server).get("/orders/notfound");
      expect(res.status).toBe(401);
    });
  });
});
