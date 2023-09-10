const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// checks to see if user is authenticated before viewing protected resources
const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(400).json({ success: false, error: err.message });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ success: false, error: "oops you need to login" });
  }
};

module.exports = { isAuthenticated };
