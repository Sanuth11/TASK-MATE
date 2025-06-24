const express = require("express");
const router = express.Router();
const User = require("../models/user");

// POST /register
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

// POST /login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) return res.send(user);
  res.status(400).send("Invalid credentials");
});

module.exports = router;
