const mongoose = require("mongoose");
const reviewschema = new mongoose.Schema({
  rate: { type: Number, default: 1 },
  comment: { type: String },
  product: { type: mongoose.Types.ObjectId, ref: "product" },
  user: String
});

const review = mongoose.model("review", reviewschema);
module.exports = review;
