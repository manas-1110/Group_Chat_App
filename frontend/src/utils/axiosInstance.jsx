import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://group-chat-app-vnh5.vercel.app",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
