const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: Number },
  adresse: { type: String },
  password: { type: String },
  birthDate: { type: Date },
  createAt: { type: Date, default: Date.now() },

  isBan: { type: Boolean, default: false },
  img: { type: String },
  role: { type: String, enum: ["client", "admin", "seller"], default: "client" }
});
module.exports = userModel = mongoose.model("user", userSchema);
