import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import app from "./app.js";

dotenv.config();

// ----- START SERVER -----
const startServer = async () => {
  try {
    // Wait for database connection before starting server
    await connectDB();

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    });

    // Graceful shutdown handler
    const gracefulShutdown = async (signal) => {
      console.log(`\n${signal} received, closing server gracefully...`);

      server.close(async () => {
        console.log(" HTTP server closed");

        try {
          // Close database connection
          await mongoose.connection.close();
          console.log(" Database connection closed");
          process.exit(0);
        } catch (err) {
          console.error(" Error during shutdown:", err);
          process.exit(1);
        }
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error("⚠️ Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    // Handle shutdown signals
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    // Handle uncaught errors
    process.on("uncaughtException", (err) => {
      console.error(" Uncaught Exception:", err);
      gracefulShutdown("UNCAUGHT_EXCEPTION");
    });

    process.on("unhandledRejection", (reason, promise) => {
      console.error(" Unhandled Rejection at:", promise, "reason:", reason);
      gracefulShutdown("UNHANDLED_REJECTION");
    });

  } catch (err) {
    console.error(" Failed to start server:", err.message);
    process.exit(1);
  }
};

// Start the server
startServer();