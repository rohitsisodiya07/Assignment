
import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000/user",
});

Api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default Api;
