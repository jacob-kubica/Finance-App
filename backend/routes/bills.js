const express = require("express");
const multer = require("multer");

const Bill = require("../models/bill");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const bill = new Bill({
        title: req.body.title,
        content: req.body.content,
        name: req.body.name,
        description: req.body.description,
        interest: req.body.interest,
        limit: req.body.limit,
        dueDate: req.body.dueDate,
        institution: req.body.institution,
        balance: req.body.balance,
      imagePath: url + "/images/" + req.file.filename
    });
    bill.save().then(createdBill => {
      res.status(201).json({
        message: "Bill added successfully",
        bill: {
          ...createdBill,
          id: createdBill._id
        }
      });
    });
  }
);

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const bill = new Bill({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      name: req.body.name,
      description: req.body.description,
      interest: req.body.interest,
      limit: req.body.limit,
      dueDate: req.body.dueDate,
      institution: req.body.institution,
      balance: req.body.balance,
      imagePath: imagePath
    });
    console.log(bill);
    Bill.updateOne({ _id: req.params.id }, bill).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  Bill.find().then(documents => {
    res.status(200).json({
      message: "Bills fetched successfully!",
      bills: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Bill.findById(req.params.id).then(bill => {
    if (bill) {
      res.status(200).json(bill);
    } else {
      res.status(404).json({ message: "Bill not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Bill.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Bill deleted!" });
  });
});

module.exports = router;