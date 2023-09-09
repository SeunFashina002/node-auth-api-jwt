const User = require("../models/user");

const signup = async (req, res) => {
  res.send("sign up");
};

const login = async (req, res) => {
  res.send("login");
};

module.exports = {
  signup,
  login,
};
