const express = require("express");
const { signup, login, logout } = require("../controllers/auth");

const router = express.Router();

// set up routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
