const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./chat_data/data");
const connectDB = require("./config/db");
const app = express();

dotenv.config();
connectDB();

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/api/chats", (req, res) => {
    res.json(chats);
    // res.send("API is running...");
});

app.get("/api/chats/:id", (req, res) => {
    const chat = chats.find((c) => c._id === req.params.id);
    // console.log(req.params.id);
    res.json(chat);
});

const PORT = 3000;

app.listen(PORT, console.log("Server is running on port", PORT));
