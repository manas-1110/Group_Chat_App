import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000", // Replace with production URL later
});

export default axiosInstance;
