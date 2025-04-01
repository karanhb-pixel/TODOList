import express from "express";
import { Task } from "../model/Task_model.js";
import { where } from "sequelize";

const app = express.Router();

//Get all Tasks
app.get("/", async (req, res) => {
  try {
    const task = await Task.findAll({
      where: { userId: req.user.user_id },
    }); // Get all tasks from the database
    const normalizedData = task.map((item) => ({
      ...item.toJSON(), // Convert Sequelize instance to plain object
      isChecked: !!item.isChecked, // Convert 1/0 to true/false
    }));
    // console.log(normalizedData);
    res.json(normalizedData);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// Add a new Task
app.post("/", async (req, res) => {
  const newTask = req.body.task;
  const description = req.body.description || null; // Optional description
  const userId = req.user.user_id;

  if (!newTask || newTask.trim() === "") {
    return res.status(400).json({ error: "Task cannot be empty" });
  }
  try {
    const task = await Task.create({
      task: newTask,
      description: description,
      userId: userId,
    }); // Create a new task in the database
    res.status(201).json({
      message: "Task added Successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error adding Task", error });
  }
});

//Delete a Task
app.delete("/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    const result = await Task.destroy({
      where: { id: taskId, userId: req.user.user_id },
    });
    if (result === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting task" });
  }
});

// Update a Task's isChecked status
app.put("/isChecked/:id", async (req, res) => {
  const taskId = req.params.id;
  const isChecked = req.body.isChecked ? 1 : 0; // Convert boolean to 1/0 for MySQL

  try {
    const result = await Task.update(
      { isChecked: isChecked },
      { where: { id: taskId, userId: req.user.user_id } }
    );
    if (result[0] === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    return res.status(404).json({ error: "Task not found" });
  }
});

// Update a Task's title or description status
app.put("/title/:id", async (req, res) => {
  const taskId = req.params.id;
  const newTask = req.body.task;
  const description = req.body.description || null; // Optional description
  if (!newTask || newTask.trim() === "") {
    return res.status(400).json({ error: "Task cannot be empty" });
  }

  try {
    const result = await Task.update(
      { task: newTask, description: description },
      { where: { id: taskId, userId: req.user.user.user_id } }
    );
    if (result[0] === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error updating task" });
  }
});

export default app;
