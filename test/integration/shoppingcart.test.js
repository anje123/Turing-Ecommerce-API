import request from "supertest";
let server;

describe("shoppingcart", () => {
  beforeAll(() => {
    server = require("../../index");
  });

  afterAll(async () => {
    server.close();
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  describe("GET /shoppingcart", () => {
    it("should return status code 200 if unique key is created", async () => {
      const res = await request(server).get("/shoppingcart/generateUniqueId");
      expect(res.status).toBe(200);
    });
  });

  describe("POST /shoppingcart/add", () => {
    it("should return status code 200 if cart is added", async () => {
      const res = await request(server)
        .post("/shoppingcart/add")
        .send({ cart_id: "1", product_id: 1, attributes: "good" });
      expect(res.status).toBe(200);
    });

    it("should return status code 400 for incorrect inputs", async () => {
      const res = await request(server)
        .post("/shoppingcart/add")
        .send({ cart_id: 1, product_id: "1", attributes: "good" });
      expect(res.status).toBe(400);
    });
  });

  describe("GET /shoppingcart/:cart_id", () => {
    it("respond with json containing all list of products in shopping cart", async () => {
      const res = await request(server).get("/shoppingcart/1");
      expect(res.status).toBe(200);
    });

    it("should return status code 404 if data was not found", async () => {
      const res = await request(server).get("/shoppingcart/notfound");
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /shoppingcart/update/:item_id", () => {
    it("should return status code 200 if cart is updated", async () => {
      const res = await request(server)
        .put("/shoppingcart/update/116")
        .send({ quantity: 2 });
      expect(res.status).toBe(200);
    });

    it("should return status code 400 for incorrect inputs", async () => {
      const res = await request(server)
        .put("/shoppingcart/update/116")
        .send({ quantity: "bad" });
      expect(res.status).toBe(400);
    });

    it("should return status code 404 cart not found", async () => {
      const res = await request(server)
        .put("/shoppingcart/update/notfound")
        .send({ quantity: 2 });
      expect(res.status).toBe(404);
    });
  });
  describe("GET ​/shoppingcart/moveToCart/:item_id", () => {
    it("should return status code 200 if item is moved to cart", async () => {
      const res = await request(server).get("/shoppingcart/moveToCart/142");
      expect(res.status).toBe(200);
    });

    it("should return status code 404 if item is not found", async () => {
      const res = await request(server).get(
        "/shoppingcart/moveToCart/notfound"
      );
      expect(res.status).toBe(404);
    });
  });
});
