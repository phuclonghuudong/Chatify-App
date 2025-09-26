import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

dotenv.config();

const app = express();
const _dirname = path.resolve();

const PORT = ENV.PORT || 5000;

app.use(express.json({ limit: "5mb" }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server Chatify App.");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../client/dist")));

  app.get(/.*/, (_, res) => {
    res.sendFile(path.join(_dirname, "../client/dist/index.html"));
  });
}
export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
  });
}
