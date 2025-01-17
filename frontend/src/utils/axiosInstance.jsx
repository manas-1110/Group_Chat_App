import axios from "axios";

const axiosInstance = axios.create({
    baseURL:
        "https://group-chat-app-vnh5-q6xw9ptr0-manas-thakurs-projects-690151d7.vercel.app/", // Replace with production URL later
});

export default axiosInstance;
