const express = require('express');
const http = require("http");
const cors = require("cors");
const bodyParser = require('body-parser');
const { Server } = require("socket.io");
const mongoose = require("mongoose");

require('./models/User');
require('./models/Messages');

const addUser = require("./routes/addUser");
const getFootPrint = require("./routes/getFootPrint");
const increaseFootPrint = require("./routes/increaseFootPrint");
const getHandPrint = require("./routes/getHandPrint");
const increaseHandPrint = require("./routes/increaseHandPrint");
const addGoal = require("./routes/addGoal");
const getGoals = require("./routes/getGoals");
const deleteGoal = require("./routes/deleteGoal");
const getUserByEmail = require("./routes/getUserByEmail");
const getMessages = require("./routes/getMessages");
const getRooms = require("./routes/getRooms");

const Messages = mongoose.model("Messages");

require('./db');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(addUser);
app.use(getFootPrint);
app.use(increaseFootPrint);
app.use(getHandPrint);
app.use(increaseHandPrint);
app.use(addGoal);
app.use(getGoals);
app.use(deleteGoal);
app.use(getUserByEmail);
app.use(getMessages);
app.use(getRooms);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", async (data) => {
    try {
      // Save the message to the database
      const existingRoom = await Messages.findOne({ room: data.room });

      if (existingRoom) {
        existingRoom.messages.unshift({
          email: data.email,
          message: data.message,
          image: data.image,
          name: data.name,
          time: data.time,
          receiverEmail:data.receiverEmail,
          receiverImage:data.receiverImage,
          receiverName:data.receiverName
        });
      
        await existingRoom.save();
      } else {
        const newRoom = new Messages({
          room: data.room,
          messages: [{
            email: data.email,
            message: data.message,
            image: data.image,
            name: data.name,
            time: data.time, 
            receiverEmail:data.receiverEmail,
            receiverImage:data.receiverImage,
            receiverName:data.receiverName
          }],
        });
      
        await newRoom.save();
      }

      io.to(data.room).emit("receive_message", data);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(7001, () => {
  console.log("SERVER RUNNING");
});
