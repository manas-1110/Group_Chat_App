import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://chat-app-deploy-vege.onrender.com/", // Replace with production URL later
});

export default axiosInstance;
