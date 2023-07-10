const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
require('./models/User');
const addUser=require("./routes/addUser")
require('./db');
app.use(bodyParser.json());
app.use(addUser)
app.listen(port, () => {
    console.log("Server is running on port " + port);
})