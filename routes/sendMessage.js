const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
require("dotenv").config();

router.post("/sendMessage", async (req, res) => {
  const { userEmail,currentMessage} = req.body;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (currentMessage !== '') {

      user.messages.unshift(currentMessage);
      await user.save();

      res.json({ message: "Message sent successfully" });
    } else {
      res.status(400).json({ error: "Empty message cannot be sent" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
