const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri =
    "mongodb+srv://manas1:1110@cluster0.7eain.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        console.log(uri);
        const conn = await mongoose.connect(uri);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;
