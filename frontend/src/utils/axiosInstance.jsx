import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const axiosInstance = axios.create({
    baseURL: process.env.BACKEND, // Replace with production URL later
});

export default axiosInstance;
