function validateStatus(str) {
  const allowedStatus = ["ignored", "interested"];
  return allowedStatus.includes(str);
}

module.exports = { validateStatus };
