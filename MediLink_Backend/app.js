import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Routes
import transactionRoutes from "./routes/transactionsRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Middlewares
import { errorHandler } from "./middleware/errorMiddleware.js";
import { authLimiter, apiLimiter } from "./middleware/rateLimitMiddleware.js";

const app = express();

// ----- MIDDLEWARE -----
app.use(helmet()); // basic security headers

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:80"
    ],
    credentials: true,
  })
);
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse form bodies

// Only use morgan logging if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === "production" ? "common" : "dev"));
}

// Apply general API rate limiting
app.use("/api/", apiLimiter);

// ----- BASE / HEALTH CHECK -----
app.get("/", (req, res) => res.send("MediLink Backend Running..."));
app.get("/api/health", (req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

// ----- API ROUTES -----
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/users", userRoutes);

// ----- 404 handler -----
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// ----- Global error handler -----
app.use(errorHandler);

export default app;
