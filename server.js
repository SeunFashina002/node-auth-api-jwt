const express = require("express");
const authRoutes = require("./routes/auth");
const app = express();

// start the server
app.listen(5000, (req, res) => {
  console.log("server is listening at port 5000");
});

// auth routes
app.use(authRoutes);
