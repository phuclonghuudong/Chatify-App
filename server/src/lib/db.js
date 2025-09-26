import dotenv from "dotenv";
import mongoose from "mongoose";
import { ENV } from "./env.js";
dotenv.config();

export const connectDB = async () => {
  try {
    if (!ENV.MONGO_URI) {
      throw new Error("MONGO_URI Không được định nghĩa trong biến môi trường.");
    }

    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("MONGODB CONNECTED: ", conn.connection.host);
  } catch (error) {
    console.log("ERROR CONNECT DB: ", error);
    process.exit(1);
  }
};
