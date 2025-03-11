const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const UserModal = require("../model/user");
const {
  validateSignupData,
  isEmailValid,
  isNameProvided,
} = require("../utils/validateSignupData");

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const allFieldPresent = validateSignupData(req.body);
    const isUserEmailValid = isEmailValid(email);
    const isFirstAndLastNameProvided = isNameProvided(firstName, lastName);
    if (!allFieldPresent) {
      return res.status(400).json({
        message: "Bad request, Not all data sent",
      });
    }

    if (!isUserEmailValid) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    if (!isFirstAndLastNameProvided) {
      return res.status(400).json({
        message: "Please provide First and LastName",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModal({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const data = await newUser.save();

    res.status(200).json({
      message: "Account Created",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = authRouter;
