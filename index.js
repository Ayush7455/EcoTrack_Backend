const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
require('./models/User');
const addUser=require("./routes/addUser")
const getFootPrint=require("./routes/getFootPrint")
const increaseFootPrint=require("./routes/increaseFootPrint")
require('./db');
app.use(bodyParser.json());
app.use(addUser)
app.use(getFootPrint)
app.use(increaseFootPrint)
app.listen(port, () => {
    console.log("Server is running on port " + port);
})