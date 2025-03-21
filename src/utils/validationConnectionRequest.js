const UserModal = require("../model/user");
const mongoose = require("mongoose");

function validateStatus(str) {
  const allowedStatus = ["ignored", "interested"];
  return allowedStatus.includes(str);
}

function validateReviewRequestStatus(str) {
  const allowedStatus = ["interested", "accepted"];
  return allowedStatus.includes(str);
}

async function validateUser(userId) {
  return mongoose.Types.ObjectId.isValid(userId);
}

module.exports = { validateStatus, validateUser, validateReviewRequestStatus };
