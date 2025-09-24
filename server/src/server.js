import dotenv from "dotenv";
import express from "express";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

dotenv.config();

const app = express();
const _dirname = path.resolve();

const VERCEL = process.env.VERCEL;
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../client/dist")));

  app.get(/.*/, (_, res) => {
    res.sendFile(path.join(_dirname, "../client/dist/index.html"));
  });
}

if (VERCEL) {
  module.exports = app;
  // module.exports.handler = serverless(app);
} else {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
