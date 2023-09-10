require("dotenv").config();

// imports
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const isAuthenticated = require("./middlewares/auth");

// environment variables
MONGODB_URL = process.env.MONGODB_URL;
PORT = process.env.PORT;

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(isAuthenticated);

// create database
mongoose
  .connect(MONGODB_URL)
  .then((result) => {
    // start the server
    app.listen(PORT, (req, res) => {
      console.log("database is connected");
      console.log("server is listening at port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// routes
app.use("/api/auth", authRoutes);
