const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const path = require("path");
// const { Socket } = require("dgram");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3500;

const users = [{}];

app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Its Working");
// });

// Making io circuit
const io = socketIO(server);
io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on("joined", ({ user, id }) => {
    users[socket.id] = user;
    console.log(`${user} has joined`);

    // This will be seen to the user itself
    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat, ${users[socket.id]}`,
    });

    // console.log("user joining");
    // This will be send to all users in the room
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has joined`,
    });

    // socket.broadcast.to(user).emit("sendMessage", {
    //   user: "Admin",
    //   message: `${users[socket.id]} has joined`,
    //   id: id
    // });

    // console.log("user joining vghvjhbjk");
  });

  socket.on("message", ({ message, id }) => {
    // For sending message to all users including sender
    io.emit("sendMessage", { user: users[id], message, id });
  });

  socket.on("disconnected", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} has left`,
    });
    console.log(`User left`);
  });
});

app.use(express.static("chatapp/build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "chatapp", "build", "index.html"));
});

server.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
