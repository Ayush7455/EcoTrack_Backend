const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
require("dotenv").config();

router.get("/getRooms/:userEmail", async (req, res) => {
  const { userEmail } = req.params;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const uniqueRoomsAndRecentMessages = user.messages.reduce((result, message) => {
      if (!result[message.room] || result[message.room].time < message.time) {
        result[message.room] = {
          message
        };
      }
      return result;
    }, {});

    res.json({ uniqueRoomsAndRecentMessages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
