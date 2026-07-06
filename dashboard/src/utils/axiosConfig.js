import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = process.env.REACT_APP_FRONTEND_URL
        ? `${process.env.REACT_APP_FRONTEND_URL}/login`
        : "http://localhost:3000/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;