const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  institution: { type: String },
  category: { type: String },
  frequency: { type: String },
  dueDate: { type: Date, default: Date.now },
  paymentMethod: { type: String },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model("Bill", billSchema);
