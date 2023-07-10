const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
require('./models/User');
const addUser=require("./routes/addUser")
const getHandPrint=require("./routes/getHandPrint")
require('./db');
app.use(bodyParser.json());
app.use(addUser)
app.use(getHandPrint)
app.listen(port, () => {
    console.log("Server is running on port " + port);
})