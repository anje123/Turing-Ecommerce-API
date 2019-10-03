import request from "supertest";
import "regenerator-runtime/runtime";
import "babel-jest";
const { sequelize } = require("../../db/models/index");
let server;

describe("/departments", () => {
  beforeEach(async () => {
    server = require("../../index");
  });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  afterEach(async () => {
    await server.close();
    sequelize.close();
  });
  describe("GET /", () => {
    it("should return status code 200 if success ", async () => {
      const res = await request(server).get("/departments");
      expect(res.status).toBe(200);
    });
  });
});
