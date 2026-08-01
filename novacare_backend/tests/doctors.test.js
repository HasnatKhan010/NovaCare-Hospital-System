import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app.js";
import { connectDB, closeDB } from "./setup.js";
import Doctor from "../models/Doctor.js";
import { mock } from "node:test";

describe("Doctors API", () => {
  before(async () => {
    await connectDB();
  });

  after(async () => {
    await closeDB();
  });

  it("should fetch a seeded doctor", async () => {
    const res = await request(app).get("/api/doctors");
    assert.strictEqual(res.statusCode, 200);
    
    const docs = res.body.doctors || res.body;
    assert.strictEqual(docs.length, 1);
    assert.strictEqual(docs[0].name, "Dr. Gregory House");
    assert.strictEqual(docs[0].specialty, "Diagnostics");
  });
});
