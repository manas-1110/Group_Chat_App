import axios from "axios";

const axiosInstance = axios.create({
    baseURL:
        "https://group-chat-app-vnh5-fhx1apdnl-manas-thakurs-projects-690151d7.vercel.app/", // Replace with production URL later
});

export default axiosInstance;
