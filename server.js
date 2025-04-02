const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Task = require("./models/task");// Import task model

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.log(err));

// Get all tasks
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Add new task
app.post("/tasks", async (req, res) => {
    const { title, deadline } = req.body;
    const task = new Task({ title, deadline, isCompleted: false });
    await task.save();
    res.json(task);
});

// Update task
app.put("/tasks/:id", async (req, res) => {
    const { title, deadline } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, deadline }, { new: true });
    res.json(updatedTask);
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
