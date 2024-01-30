const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();

router.get('/getUserByEmail', (req, res) => {
  const { keyword } = req.body;

  if (!keyword) {
    return res.status(422).json({ error: "Please search a username" });
}


 
User.find({ email: { $regex: keyword, $options: 'i' } })
.then(user => {
    
    let data = [];
    user.map(item => {
        data.push(
            {
                email:item.email,
                name: item.name,
                image:item.image,
            }
        )
    })

    
    if (data.length == 0) {
        return res.status(422).json({ error: "No User Found" });
    }
    res.status(200).send({ message: "User Found", user: data });

})
.catch(err => {
    res.status(422).json({ error: "Server Error" });
})
})


module.exports = router;
