const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter an email"],
    lowercase: true,
    unique: true,
    vaildate: [isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    minlength: [6, "password can only be six characters or more"],
    required: [true, "please enter a password"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
