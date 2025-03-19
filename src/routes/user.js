const express = require("express");
const jwt = require("jsonwebtoken");
const UserModal = require("../model/user");

const userRoute = express.Router();

userRoute.get("/profile", async (req, res) => {
  try {
    const { authToken } = req.cookies;
    if (!authToken) {
      return res.status(401).json({
        message: "Invalid token, please login",
      });
    }
    const decodedValue = jwt.verify(authToken, "RandomPassword");
    const { userId } = decodedValue;

    const user = await UserModal.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Invalid token, please login",
      });
    }

    req.user = user;
    res.status(200).json({
      message: "Your Profile",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = userRoute;
