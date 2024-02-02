const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
require("dotenv").config();

router.post("/sendMessage", async (req, res) => {
  const { email, room, currentMessage, image, name } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (currentMessage !== '') {
      const messageData = {
        room: room,
        message: currentMessage,
        email: email,
        image: image,
        name: name,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };

      user.messages.unshift(messageData);
      await user.save();

      res.json({ message: "Message sent successfully", data: messageData });
    } else {
      res.status(400).json({ error: "Empty message cannot be sent" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
