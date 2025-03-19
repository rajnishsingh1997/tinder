const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
  },
  age: {
    type: Number,
    min: 18,
  },
  skills: {
    type: [String],
    validate: {
      validator: function (value) {
        return value.length <= 5;
      },
      message: `Please add upto 5 skills`,
    },
  },
  gender: {
    type: String,
    validate: {
      validator: function (value) {
        return ["male", "female", "others"].includes(value);
      },
      message: `{VALUE} is not valid gender type`,
    },
  },
});

const User = mongoose.model("UserModal", userSchema);

module.exports = User;
