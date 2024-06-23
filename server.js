const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cron = require("node-cron");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});
app.get("/wingo1", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "wingo1.html"));
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const realTimeDataController = require("./controllers/realTimeDataController");
realTimeDataController(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
