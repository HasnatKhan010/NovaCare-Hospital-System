import { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app.js";
import { connectDB, closeDB } from "./setup.js";
import { User } from "../models/User.js";
import { mock } from "node:test";

describe("Auth API", () => {
  before(async () => {
    await connectDB();
  });

  after(async () => {
    await closeDB();
  });

  it("should register a new user successfully", async () => {
    mock.method(User, "findOne", async () => null); // No existing user
    
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "user"
      });
      
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.user.email, "test@example.com");
    assert.strictEqual(res.body.access, "mocked-jwt-token");
  });

  it("should block registration with an existing email", async () => {
    mock.method(User, "findOne", async () => ({ email: "test@example.com" })); // User exists
    
    const res = await request(app).post("/api/auth/signup").send({
      name: "Clone User",
      email: "test@example.com",
      password: "password123",
      role: "user"
    });

    assert.strictEqual(res.statusCode, 409);
    assert.match(res.body.message, /Email taken/i);
  });
});
