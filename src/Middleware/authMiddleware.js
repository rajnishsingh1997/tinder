const jwt = require("jsonwebtoken");
const UserModal = require("../model/user");

async function userAuthCheckMiddleWare(req, res, next) {
  try {
    const { authToken } = req.cookies;
    if (!authToken) {
      return res.status(400).json({
        message: "Invalid token, Please login",
      });
    }

    const isTokenValid = jwt.verify(authToken, "RandomPassword");
    if (!isTokenValid) {
      return res.status(400).json({
        message: "Invalid token, Please login",
      });
    }
    const { userId } = isTokenValid;
    const loggedInUser = await UserModal.findById(userId);
    req.user = loggedInUser;
    next();
  } catch (error) {
    console.error(error);
  }
}

module.exports = userAuthCheckMiddleWare;
