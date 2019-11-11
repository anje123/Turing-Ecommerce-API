import request from "supertest";
import jwt from "jsonwebtoken";

let server;
let token;

describe("products /", () => {
  beforeAll(() => {
    server = require("../../index");
  });

  afterAll(async () => {
    server.close();
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  describe("GET/ products", () => {
    it("respond with json containing a list of all products", async () => {
      const res = await request(server).get("/products");
      expect(res.status).toBe(200);
    });
  });

  describe("GET /products/search", () => {
    it("respond with json containing a product base on the search", async () => {
      const res = await request(server).get(
        "/products/search?query_string=Arc d'Triomphe"
      );
      expect(res.status).toBe(200);
    });

    it("should return status code 404 if data is not sent back", async () => {
      const res = await request(server).get(
        "/products/search?query_string=notaproduct"
      );
      expect(res.status).toBe(404);
    });
  });

  describe("GET /products/:product_id", () => {
    it("respond with json containing a product base on the id given", async () => {
      const res = await request(server).get("/products/2");
      expect(res.status).toBe(200);
    });

    it("should return status code 404 if data is not sent back", async () => {
      const res = await request(server).get("/products/notfoundid");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /products/inCategory/:category_id", () => {
    it("respond with json containing a list of all products of categories based on the id given", async () => {
      const res = await request(server).get("/products/inCategory/2");
      expect(res.status).toBe(200);
    });

    it("should return status code 404 if data is not sent back", async () => {
      const res = await request(server).get("/products/inCategory/notfoundid");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /products/inDepartment/:department_id", () => {
    it("respond with json containing a list of all products on department based on the given id", async () => {
      const res = await request(server).get("/products/inDepartment/2");
      expect(res.status).toBe(200);
    });

    it("should return status code 404 if data is not sent back", async () => {
      const res = await request(server).get(
        "/products/inDepartment/notfoundid"
      );
      expect(res.status).toBe(404);
    });
  });

  describe("GET /products/:product_id/details", () => {
    it("respond with json containing a list of all product details", async () => {
      const res = await request(server).get("/products/2/details");
      expect(res.status).toBe(200);
    });

    it("should return status code 404 if data is not sent back", async () => {
      const res = await request(server).get("/products/notfoundid/details");
      expect(res.status).toBe(404);
    });
  });

  describe("GET /products/:product_id/reviews", () => {
    it("respond with json containing a list of all reviews on product", async () => {
      const res = await request(server).get("/products/2/reviews");
      expect(res.status).toBe(200);
    });

    it("should return status code 404 if data is not sent back", async () => {
      const res = await request(server).get("/products/notfound/reviews");
      expect(res.status).toBe(404);
    });
  });
});
