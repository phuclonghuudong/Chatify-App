import express from "express";

const router = express.Router();

// /api/messages

router.get("/send", (req, res) => {
  res.send("Send!");
});

export default router;
