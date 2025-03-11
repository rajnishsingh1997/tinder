const validator = require("validator");

function validateSignupData(user) {
  const requiredField = ["firstName", "lastName", "email", "password"];
  const signupDataKeys = Object.keys(user);
  const data = requiredField.every((value) => {
    return signupDataKeys.includes(value);
  });

  return data;
}

function isEmailValid(str) {
  if (!validator.isEmail(str)) {
    return false;
  }
  return true;
}

function isNameProvided(firstName, lastName) {
  if (validator.isEmpty(firstName || "") || validator.isEmpty(lastName || "")) {
    return false;
  }
  return true;
}

module.exports = { validateSignupData, isEmailValid, isNameProvided };
