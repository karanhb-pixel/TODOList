import cors from "cors";
import express from "express";
import db from "./db.js";

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

//Get all Tasks
app.get("/tasks", (req, res) => {
  const q = "SELECT * FROM tasks";
  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching tasks" });
    }
    const normalizedData = data.map((item) => ({
      ...item,
      isChecked: !!item.isChecked, // Convert 1/0 to true/false
    }));
    // console.log(normalizedData);
    res.json(normalizedData);
  });
});

// Add a new Task
app.post("/tasks", (req, res) => {
  const newTask = req.body.task;
  const description = req.body.description || null; // Optional description
  if (!newTask || newTask.trim() === "") {
    return res.status(400).json({ error: "Task cannot be empty" });
  }
  const q = "INSERT INTO tasks (task,description) VALUES (?,?)";
  db.query(q, [newTask, description], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error adding Task" });
    }
    res.status(201).json({
      message: "Task added Successfully",
      id: result.insertId,
      task: newTask,
      description: description,
      isChecked: false, // Default value for isChecked
    });
  });
  //   res.status(201).json({ message: "Task added Successfully", newTask });
});

//Delete a Task
app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const q = "DELETE FROM tasks WHERE id =?";
  db.query(q, [taskId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting task" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  });
});

// Update a Task's isChecked status
app.put("/tasks/isChecked/:id", (req, res) => {
  const taskId = req.params.id;
  const isChecked = req.body.isChecked ? 1 : 0; // Convert boolean to 1/0 for MySQL

  const q = "UPDATE tasks SET isChecked = ? WHERE id = ?";

  db.query(q, [isChecked, taskId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error updating task" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully" });
  });
});

// Update a Task's title or description status
app.put("/tasks/title/:id", (req, res) => {
  const taskId = req.params.id;
  const newTask = req.body.task;
  const description = req.body.description || null; // Optional description
  if (!newTask || newTask.trim() === "") {
    return res.status(400).json({ error: "Task cannot be empty" });
  }

  const q = "UPDATE tasks SET task = ? , description = ? WHERE id = ?";

  db.query(q, [newTask, description, taskId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error updating task" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully" });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
