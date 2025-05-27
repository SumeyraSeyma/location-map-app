import request from "supertest";
import app from "../src/index.js";
import mongoose from "mongoose";
import Location from "../src/models/Location.js";

beforeAll(async () => {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/map-app"
  );
});

afterAll(async () => {
  await mongoose.connection.close();
  await new Promise((resolve) => setTimeout(resolve, 500));
});

beforeEach(async () => {
  await Location.deleteMany();
});

describe("Location API", () => {
  it("should create a new location", async () => {
    const res = await request(app).post("/api/locations").send({
      name: "Test Location",
      latitude: 41.0082,
      longitude: 28.9784,
      color: "#FF0000",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test Location");
  });

  it("should return 400 for invalid latitude", async () => {
    const res = await request(app).post("/api/locations").send({
      name: "Test Location",
      latitude: 200,
      longitude: 28.9784,
      color: "#FF0000",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});
