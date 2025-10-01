import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3005/api"
      : "https://chatify-app-b4om.onrender.com/api",
  //  "https://chatify-app-b4om.onrender.com",
  // "https://server-chatify-app.vercel.app/api",
  withCredentials: true,
  transports: ["websocket"],
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originRequest = error.config;

    console.log("ERROR: ", error);
    return Promise.reject(error);
  }
);
