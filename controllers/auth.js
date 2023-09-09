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

// handle errors
const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  // duplicate email error
  if (err.code === 11000) {
    errors.email = "user with this email exists";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
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
    const errors = handleErrors(err);
    res.status(400).json({ success: false, errors: errors });
  }
};

const login = async (req, res) => {
  res.send("login");
};

module.exports = {
  signup,
  login,
};
