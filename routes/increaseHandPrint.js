const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();

router.post("/increaseHandPrint", (req, res) => {
  const { email, handprint } = req.body;

  if (!email || !handprint) {
    return res.status(404).json({ message: "Email and Handprint are required" });
  }

  User.findOneAndUpdate(
    { email: email },
    { $push: { handprint: handprint } }, // Use $push to add the updated value to the array
    { new: true } // To return the updated document
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "Handprint updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
