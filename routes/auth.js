const express = require("express");
const { signup, login } = require("../controllers/auth");

const router = express.Router();

// set up routes
router.get("/signup", signup);
router.get("/login", login);

module.exports = router;
