const express = require("express");
const jwt = require("jsonwebtoken");
const UserModal = require("../model/user");
const userAuthCheckMiddleWare = require("../Middleware/authMiddleware");
const validateUpdateData = require("../utils/validateUpdateData");
const userRoute = express.Router();

userRoute.get("/profile", userAuthCheckMiddleWare, async (req, res) => {
  try {
    const user = req.user;
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

userRoute.patch(
  "/profile/update",
  userAuthCheckMiddleWare,
  async (req, res) => {
    try {
      const isUpdateAllowed = validateUpdateData(req.body);

      if (!isUpdateAllowed) {
        res.status(401).json({
          message: "Update not allowed",
        });
      }
      const receivedUpdateField = Object.keys(req.body);
      const user = req.user;
      receivedUpdateField.forEach((key) => {
        user[key] = req.body[key];
      });

      const updateUser = await user.save();
      res.status(200).json({
        message: "Profile updated successfully",
        data: updateUser,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = userRoute;
