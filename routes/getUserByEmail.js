const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();

router.get("/getUserByEmail", (req, res) => {
  const { email } = req.query

  if (!email) {
    return res.status(400).json({ message: "Email is required as a query parameter" });
  }

  User.findOne({ email: email }, { email: 1, image: 1})
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ email: user.email, image: user.image });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
