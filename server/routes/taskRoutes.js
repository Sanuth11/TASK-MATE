const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// GET all tasks for a user
router.get("/:userId", async (req, res) => {
  const tasks = await Task.find({ userId: req.params.userId });
  res.send(tasks);
});

// POST a new task
router.post("/", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send(task);
});

// PUT update a task
router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(task);
});

// DELETE a task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send({ success: true });
});

module.exports = router;
