require("dotenv").config();
const mongoose = require("mongoose");
const msgLog = require("./mongoose")
const express = require("express");
const https = require("https"); 
const { server } = require("socket.io");
const app = express();
const server = https.createServer(app);

const io = new Server(server, {
  cors: {
      origin: "https://witty-tree-0301e6603.4.azurestaticapps.net", // Frontend URL
      methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get(
  "/api/messages",
  async(req, res) => {
    const storedMessages = await msgLog.find({}).sort({timestamp: 1});
    console.log("Getting all messages" + storedMessages);
    res.json(storedMessages);
    io.emit("storedMessages", storedMessages);
  }
);

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
      console.log("A user disconnected");
  });
});

app.post(
  "/api/messages",
  async (req, res) => {
    try {
      const message = await msgLog.create(req.body);
      if (!message) {
        return res.status(400).json({ error: "Text is required" });
      }
      res.json(message);
    }
    catch (error) {
      console.log(error.message)
      res.status(404);
    }
  }
);

mongoose.
connect(process.env.MONGO_URI)
.then(() => {
  console.log("connected to mongodb");
  server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
  
});