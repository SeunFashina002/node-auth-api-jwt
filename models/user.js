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

// login functionality
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("email does not exist");
};

const User = mongoose.model("user", userSchema);
module.exports = User;
