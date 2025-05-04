import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api", // Ensure this is the correct URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach Bearer token from cookies
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token.trim()}`;
        } else {
            console.warn("Authorization token missing!");
        }
        console.log("Request Headers:", config.headers); // Verify headers are set correctly
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Global error handling for responses
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("API Response Error:", {
                status: error.response.status,
                data: error.response,
            });
        } else {
            console.error("Network Error or Invalid Request:", error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
