const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function validateUserPassword(password, originalPasswordFromDB) {
  const isPasswordValid = await bcrypt.compare(
    password,
    originalPasswordFromDB
  );
  return isPasswordValid;
}

module.exports = validateUserPassword;
