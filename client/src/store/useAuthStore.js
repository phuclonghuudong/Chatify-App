import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3005/" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("CHECK AUTH: ", res);
    } catch (error) {
      console.log("CHECK AUTH ERROR: ", error);
      set({ authUser: null });
    } finally {
    }
  },
}));
