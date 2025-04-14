const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    qtes: {
      type: Number,
      required: true // Correction de la faute de frappe "rerquired" -> "required"
    },
    description: {
      // Correction de "descripton" -> "description"
      type: String,
      default: "" // Ajout d'une valeur par défaut
    },
    category: {
      type: String,
      required: true
    },
    size: {
      type: [String],
      default: [] // Valeur par défaut
    },
    color: {
      type: [String],
      default: [] // Valeur par défaut
    },
    disponible: {
      type: Boolean,
      default: true
    },
    img: {
      type: String,
      default: "" // Valeur par défaut
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review" // Convention: modèle avec majuscule
      }
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User" // Convention: modèle avec majuscule
    }
  },
  {
    timestamps: true // Optionnel: ajoute created_at et updated_at
  }
);

const Product = mongoose.model("Product", productSchema); // Convention: modèle avec majuscule
module.exports = Product;
