const User = require("../models/user");
const jwt = require("jsonwebtoken");

// environment variables

const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;

// generate jwt
const maxAge = 3 * 24 * 60 * 60; //3 days in seconds
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: maxAge,
  });
};
const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = generateToken(user._id);

    // add token to response header as a cookie
    res.cookie("token", token, {
      httpOnly: NODE_ENV === "development" ? false : true,
      secure: NODE_ENV === "development" ? false : true,
      maxAge: maxAge * 1000, //3days in milliseconds
      sameSite: "Strict", // Prevents CSRF
    });

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const login = async (req, res) => {
  res.send("login");
};

module.exports = {
  signup,
  login,
};
