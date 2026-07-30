import mongoose from "mongoose";
import { mock } from "node:test";
import Doctor from "../models/Doctor.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const connectDB = async () => {
  mock.method(mongoose, "connect", async () => {});
  
  // Mock User Model
  mock.method(User, "findOne", async () => null);
  mock.method(User.prototype, "save", async function () {
    this._id = "mocked-user-id";
    return this;
  });
  mock.method(User, "create", async (data) => {
    return { ...data, _id: "mocked-user-id" };
  });

  // Mock Doctor Model chaining methods
  const mockCursor = {
    skip: function() { return this; },
    limit: function() { return this; },
    lean: async function() { return [{ name: "Dr. Gregory House", specialty: "Diagnostics", _id: "doc1" }]; }
  };
  
  mock.method(Doctor, "find", () => mockCursor);
  mock.method(Doctor, "countDocuments", async () => 1);
  
  mock.method(Doctor.prototype, "save", async function () {
    this._id = "mocked-doc-id";
    return this;
  });

  mock.method(jwt, "sign", () => "mocked-jwt-token");
};

export const closeDB = async () => {
  mock.restoreAll();
};

export const clearDB = async () => {};
