const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
require("dotenv").config();

router.get("/getMessages/:userEmail/:roomId", async (req, res) => {
  const { userEmail, roomId } = req.params;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const messagesInRoom = user.messages.filter(message => message.room === roomId);

    res.json({ messages: messagesInRoom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
