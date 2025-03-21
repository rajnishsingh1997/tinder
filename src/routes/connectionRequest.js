const express = require("express");
const userAuthCheckMiddleWare = require("../Middleware/authMiddleware");
const ConnectionModal = require("../model/connectionRequestModal");
const {
  validateStatus,
  validateUser,
  validateReviewRequestStatus,
} = require("../utils/validationConnectionRequest");
const connectionRequestRouter = express.Router();

connectionRequestRouter.post(
  "/request/send/:status/:toUserId",
  userAuthCheckMiddleWare,
  async (req, res) => {
    try {
      const { status, toUserId } = req.params;
      const { _id } = req.user;
      const isStatusValid = validateStatus(status);
      const isUserIdValid = await validateUser(toUserId);

      if (!isStatusValid) {
        return res.status(400).json({
          message: "invalid status code",
        });
      }

      if (!isUserIdValid) {
        return res.status(400).json({
          message: "unable to send request",
        });
      }

      const existingConnection = await ConnectionModal.findOne({
        $or: [
          { fromUserId: _id, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: _id },
        ],
      });

      if (existingConnection) {
        return res.status(400).json({
          message: "Connection request already exits",
        });
      }

      const newConnectionRequest = ConnectionModal({
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

connectionRequestRouter.post(
  "/request/review/:status",
  userAuthCheckMiddleWare,
  async (req, res) => {
    try {
      const { status } = req.params;
      const loggedInUser = req.user;
      const { _id } = loggedInUser;
      const isStatusValid = validateReviewRequestStatus(status);

      if (!isStatusValid) {
        return res.status(400).json({
          message: "invalid status code",
        });
      }

      const findConnectionRequest = await ConnectionModal.find({
        toUserId: _id,
        status: "interested",
      });
      
      if (findConnectionRequest.length === 0) {
        return res.status(404).json({
          message: "No request found",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = connectionRequestRouter;
