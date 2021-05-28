const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const cardsRoutes = require("./routes/cards");
const billsRoutes = require("./routes/bills");
const accountsRoutes = require("./routes/accounts");

const app = express();

mongoose
  .connect(
    "mongodb+srv://Jacob:PTEh0h05rF4KygVO@cluster0.fjy4q.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/accounts", accountsRoutes);
app.use("/api/bills", billsRoutes);
app.use("/api/cards", cardsRoutes);

module.exports = app;
