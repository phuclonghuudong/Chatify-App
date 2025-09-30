import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3005/api"
      : "https://server-chatify-app.vercel.app/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originRequest = error.config;

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originRequest = error.config;

    return Promise.reject(error);
  }
);
