const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

let messages = [];
let currentId = 0;

app.get(
  "/api/messages",
  (req, res) => {
    console.log("Getting all messages");
    res.json(messages);
  }
);

app.post(
  "/api/messages",
  (req, res) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const newMessage = {
      id: ++currentId,
      text: text,
      createdAt: new Date()
    }

    messages.push(newMessage);
    res.status(200).json(newMessage);
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});