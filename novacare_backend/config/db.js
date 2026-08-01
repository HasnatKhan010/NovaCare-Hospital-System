import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/medilink";
    const conn = await mongoose.connect(mongoUri);
    console.log(` MongoDB Connected: ${conn.connection.host}`);
    console.log(` Using Database: ${conn.connection.name}`);

    // Optional: list all collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(" Collections found:", collections.map(c => c.name));
  } catch (err) {
    console.warn(` ⚠️ MongoDB Warning: ${err.message}`);
    console.warn(` ⚠️ Running backend without active DB connection. Connect a local MongoDB or MongoDB Atlas MONGO_URI to enable database features.`);
  }
};

export default connectDB;
