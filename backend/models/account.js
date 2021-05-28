const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  interest: { type: Number, default: 1 },
  limit: { type: Number },
  dueDate: {type: Date, default: Date.now},
  institution: {type: String},
  balance: {type: Number},
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model("Account", accountSchema);
