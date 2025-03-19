function validateUpdateData(req) {
  const allowedUpdate = ["photoUrl", "age", "skills", "gender"];
  const keysFromRequestObject = Object.keys(req);
  const result = keysFromRequestObject.every((key) =>
    allowedUpdate.includes(key)
  );
  return result;
}

module.exports = validateUpdateData;
