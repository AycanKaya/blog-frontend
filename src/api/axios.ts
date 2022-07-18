import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:44371/api",
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

export default axiosInstance;
