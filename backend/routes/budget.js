const express = require("express");

const multer = require("multer");

// import Schema
const Budget = require("../models/budget");
const router = express.Router();

router.post("", (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const budget = new Budget({
    percentage: req.body.percentage,
    exemptFromRecalculation: req.body.exemptFromRecalculation,
    modifer: req.body.modifer,
    contribution: req.body.contribution,
    budgetItem: req.body.budgetItem,
  });
  budget.save().then((createdBudget) => {
    res.status(201).json({
      message: "Budget added successfully",
      budget: {
        ...createdBudget,
        id: createdBudget._id,
      },
    });
  });
});

router.put("/:id", (req, res, next) => {
  const budget = new Budget({
    percentage: req.body.percentage,
    exemptFromRecalculation: req.body.exemptFromRecalculation,
    modifer: req.body.modifer,
    contribution: req.body.contribution,
    budgetItem: req.body.budgetItem,
  });
  console.log(budget);
  Budget.updateOne({ _id: req.params.id }, budget).then((result) => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Card.find().then((documents) => {
    res.status(200).json({
      message: "Budget fetched successfully!",
      budgets: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Budget.findById(req.params.id).then((budget) => {
    if (card) {
      res.status(200).json(budget);
    } else {
      res.status(404).json({ message: "Budget not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Budget.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Budget deleted!" });
  });
});

module.exports = router;
