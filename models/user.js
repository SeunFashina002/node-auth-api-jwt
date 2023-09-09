const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter an email"],
    lowercase: true,
    unique: true,
    validate: [isEmail, "please provide a valid email"],
  },
  password: {
    type: String,
    minlength: [6, "password can only be six characters or more"],
    required: [true, "please enter a password"],
  },
});

// hash the password before saving it to the database
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("user", userSchema);
module.exports = User;
