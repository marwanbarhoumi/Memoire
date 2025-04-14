const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/DB");
const productRouter = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques (images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
console.log("Dossier uploads servi depuis :", path.join(__dirname, "uploads"));


// Connexion DB
connectDB();

// Routes
app.use("/api/products", productRouter);

// Vérification du service
app.get("/api/products/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    service: "product-service",
    db: "connected",
    uploads: "enabled",
    timestamp: new Date().toISOString()
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error("Erreur Produit:", err);
  res.status(500).json({ 
    error: "Erreur interne du serveur",
    message: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// Port
const PORT = process.env.PRODUCT_PORT || 7003;

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`
  🚀 Service Produit démarré avec succès
  📌 Port: ${PORT}
  🌐 URL Base: http://localhost:${PORT}/api/products
  📁 Accès fichiers: http://localhost:${PORT}/uploads/
  ⏰ Démarrage: ${new Date().toLocaleTimeString()}
  `);
});