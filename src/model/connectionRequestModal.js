const express = require("express");
const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const ConnectionRequestModal = mongoose.model(
  "ConnectionModel",
  connectionSchema
);

module.exports = ConnectionRequestModal;
