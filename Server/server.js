import cors from "cors";
import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authMiddleware from "./middleware/auth.js";

const app = express();
const PORT = process.env.DB_PORT || 5000;
app.use(cors());
app.use(express.json());

//Use the userRoutes
app.use("/auth", userRoutes);

//middleware for routes protection
app.use(authMiddleware);

//Use the taskRoutes
app.use("/", taskRoutes);

//get user profile
app.get("/profile", (req, res) => {
  res.json({ user: req.user });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
