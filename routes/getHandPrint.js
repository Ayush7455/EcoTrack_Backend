const express=require("express")
const router=express.Router();
const mongoose=require("mongoose")
const User=mongoose.model("User")

require("dotenv").config()
router.post("/getUserFingerprint", (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(200).json({ message: "Email is missing" });
    } else {
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return res.status(200).json({ message: "User not found" });
          }
          const fingerprint = user.fingerprint;
          return res.send(fingerprint)
        })
        .catch((err) => {
          console.log(err);
          return res.status(200).json({ message: "Internal server error" });
        });
    }
  });
  module.exports=router
  