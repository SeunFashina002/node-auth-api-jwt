const User = require("../models/user");

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
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
