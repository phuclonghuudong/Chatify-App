import express from "express";

const router = express.Router();

// /api/auth

router.get("/signup", (req, res) => {
  res.send("Hester!");
});

router.get("/login", (req, res) => {
  res.send("Hello, Login!");
});

router.get("/logout", (req, res) => {
  res.send("Hello, Logout!");
});

export default router;
