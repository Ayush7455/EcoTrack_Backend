const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();

router.get("/getUserByEmail", (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required as a query parameter" });
  }

  const keywordRegex = new RegExp(email, 'i'); // Create a case-insensitive regular expression

  User.find({ email: keywordRegex }, { email: 1, image: 1 })
    .then((users) => {
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }

      // Extract relevant information for each user
      const results = users.map((user) => ({ email: user.email, image: user.image }));

      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
