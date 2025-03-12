const express = require("express");
const userRoute = express.Router();

userRoute.get("/profile", async (req, res) => {
  const { authToken } = req.cookies;

  if (!authToken) {
    res.status(401).json({
      message: "Invalid entry, please login",
    });
  }

  
});

module.exports = userRoute;
