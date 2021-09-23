const express = require("express");

const multer = require("multer");

const Account = require("../models/account");

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
    const account = new Account({
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
    account.save().then((createdAccount) => {
      res.status(201).json({
        message: "Account added successfully",
        account: {
          ...createdAccount,
          id: createdAccount._id,
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
    const account = new Account({
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
    console.log(account);
    Account.updateOne({ _id: req.params.id }, account).then((result) => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  Account.find().then((documents) => {
    res.status(200).json({
      message: "Accounts fetched successfully!",
      accounts: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Account.findById(req.params.id).then((account) => {
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: "Account not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Account.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Account deleted!" });
  });
});

module.exports = router;
