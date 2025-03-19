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
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("UserModal", userSchema);

module.exports =User;
