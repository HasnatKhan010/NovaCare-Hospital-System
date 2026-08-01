import { describe, it } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app.js";

describe("Health Check API", () => {
  it("should return 200 OK and status 'ok' for /api/health", async () => {
    const res = await request(app).get("/api/health");
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.status, "ok");
    assert.ok(res.body.time);
  });

  it("should return 200 OK for base route /", async () => {
    const res = await request(app).get("/");
    assert.strictEqual(res.statusCode, 200);
    assert.match(res.text, /MediLink Backend Running/);
  });
});
