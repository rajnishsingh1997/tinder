const express = require("express");
const userAuthCheckMiddleWare = require("../Middleware/authMiddleware");
const ConnectionSchema = require("../model/connectionRequestModal");
const { validateStatus } = require("../utils/validationConnectionRequest");
const connectionRequestRouter = express.Router();

connectionRequestRouter.post(
  "/request/send/:status/:toUserId",
  userAuthCheckMiddleWare,
  async (req, res) => {
    try {
      const { status, toUserId } = req.params;
      const { _id } = req.user;
      const isStatusValid = validateStatus(status);
      if (!isStatusValid) {
        return res.status(400).json({
          message: "invalid status code",
        });
      }


      const newConnectionRequest = ConnectionSchema({
        fromUserId: _id,
        toUserId: toUserId,
        status: status,
      });
      await newConnectionRequest.save();
      res.status(200).json({
        message: "connection request sent",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = connectionRequestRouter;
