const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserModal = require("../model/user");
const userAuthCheckMiddleWare = require("../Middleware/authMiddleware");
const validateUpdateData = require("../utils/validateUpdateData");
const validateUserPassword = require("../utils/validateUserPassword");
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

userRoute.patch(
  "/profile/changePassword",
  userAuthCheckMiddleWare,
  async (req, res) => {
    try {
      const { password, newPassword } = req.body;
      const user = req.user;

      const comparePassword = validateUserPassword(password, user.password);

      if (!comparePassword) {
        return res.status(400).json({
          message: "Invalid password",
        });
      }
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = newHashedPassword;
      await user.save();
      res.status(200).json({
        message: "Password updated",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = userRoute;
