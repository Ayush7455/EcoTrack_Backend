const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
require("dotenv").config();

router.get("/getMessages", async (req, res) => {
  const { userEmail } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const messages = user.messages;

    res.json({ messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
