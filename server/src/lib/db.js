import mongoose from "mongoose";
import { ENV } from "./env.js";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log(" Using existing MongoDB connection");
    return;
  }

  try {
    if (!ENV.MONGO_URI) {
      throw new Error("MONGO_URI Không được định nghĩa trong biến môi trường.");
    }

    const conn = await mongoose.connect(ENV.MONGO_URI);
    isConnected = conn.connections[0].readyState === 1;
    console.log("MONGODB CONNECTED: ", conn.connection.host);
  } catch (error) {
    console.error("ERROR CONNECT DB:", error.message);
    if (ENV.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};
