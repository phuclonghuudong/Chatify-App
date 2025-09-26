import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDB = async () => {
  try {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI Không được định nghĩa trong biến môi trường.");
    }

    const conn = await mongoose.connect(MONGO_URI);
    console.log("MONGODB CONNECTED: ", conn.connection.host);
  } catch (error) {
    console.log("ERROR CONNECT DB: ", error);
    process.exit(1);
  }
};
