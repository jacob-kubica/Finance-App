const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema({
  percentage: { type: Number, required: true },
  exemptFromRecalculation: { type: Boolean, required: true },
  modifer: { type: Number, required: true },
  contribution: { type: Number, required: true},
  budgetItem: { type: String, required: true}
});

module.exports = mongoose.model("Budget", budgetSchema);
