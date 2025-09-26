import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

// /api/auth

router.post("/signup", signup);

router.get("/login", (req, res) => {
  res.send("Hello, Login!");
});

router.get("/logout", (req, res) => {
  res.send("Hello, Logout!");
});

export default router;
