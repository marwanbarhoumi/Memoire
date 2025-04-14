const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/DB");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());


// Database Connection
connectDB();

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Health Check Endpoint
app.get("/api/users/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    service: "user-service",
    db: "connected",
    fileStorage: "enabled",
    auth: "active",
    timestamp: new Date().toISOString()
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("User Service Error:", err);
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

// Server Configuration
const PORT = process.env.USER_PORT || 7004;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`
  🚀 User Service successfully started
  📌 Port: ${PORT}
  🌐 Base URL: http://${HOST}:${PORT}/api/users
  🔒 Auth URL: http://${HOST}:${PORT}/api/auth
  📁 Avatars: http://${HOST}:${PORT}/avatars/
  ⏰ Started: ${new Date().toLocaleString()}
  `);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});