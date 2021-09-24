const express = require("express");
const multer = require("multer");

const Card = require("../models/card");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
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
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const card = new Card({
      title: req.body.title,
      content: req.body.content,
      name: req.body.name,
      description: req.body.description,
      interest: req.body.interest,
      limit: req.body.limit,
      dueDate: req.body.dueDate,
      institution: req.body.institution,
      balance: req.body.balance,
      imagePath: url + "/images/" + req.file.filename,
    });
    card.save().then((createdCard) => {
      res.status(201).json({
        message: "Card added successfully",
        card: {
          ...createdCard,
          id: createdCard._id,
        },
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
      imagePath = url + "/images/" + req.file.filename;
    }
    const card = new Card({
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
      imagePath: imagePath,
    });
    console.log(card);
    Card.updateOne({ _id: req.params.id }, card).then((result) => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  Card.find().then((documents) => {
    res.status(200).json({
      message: "Cards fetched successfully!",
      cards: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Card.findById(req.params.id).then((card) => {
    if (card) {
      res.status(200).json(card);
    } else {
      res.status(404).json({ message: "Card not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Card.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Card deleted!" });
  });
});

module.exports = router;
