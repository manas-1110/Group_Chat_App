const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./chat_data/data");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const chatRoutes = require("./routes/chatRoutes");
const cors = require("cors");

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/user", userRoutes);
app.use("/api/chats", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, console.log("Server is running on port", PORT));
