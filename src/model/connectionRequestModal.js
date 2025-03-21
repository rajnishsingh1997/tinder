const mongoose = require("mongoose");
const UserModal = require("../model/user");

const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "ignored", "accepted", "interested", "rejected"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true }
);

const ConnectionRequestModal = mongoose.model(
  "ConnectionModel",
  connectionSchema
);

module.exports = ConnectionRequestModal;
