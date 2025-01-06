const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.mongo_uri;

const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, clientOptions);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;
