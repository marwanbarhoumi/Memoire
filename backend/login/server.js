const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/DB");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion DB
connectDB();

// Routes
testRouter = require("./routes/authRoutes");
app.use("/api/auth", testRouter);

// Route de vérification de l'état du service directement sur app
app.get("/api/auth/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "login" });
});


const PORT = process.env.PORT || 7002

;
app.listen(PORT, () => {
  console.log(`✅ Auth Service running on port ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}/api/auth`);
});