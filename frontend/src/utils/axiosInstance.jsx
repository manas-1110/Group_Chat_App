import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://group-chat-app-vnh5.vercel.app/", // Replace with production URL later
});

export default axiosInstance;
