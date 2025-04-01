import express from "express";
import { User } from "../model/User_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express.Router();

//Register a new user
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const oldEmailUser = await User.findOne({ where: { email } });
    if (oldEmailUser) {
      return res.status(400).json({ error: "User with Email already exists" });
    }
    const oldUsernameUser = await User.findOne({ where: { username } });
    if (oldUsernameUser) {
      return res
        .status(400)
        .json({ error: "User with Username already exists" });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      username: username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Generate a token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    // console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }

  //Login a user
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const user = await User.findOne({ where: { email } });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user.id, email },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        return res.status(200).json({ token, user });
      }
      return res.status(400).json({ error: "Invalid credentials" });
    } catch (error) {
      // console.error("Error logging in user:", error);
      res.status(500).json({ error: "Error logging in user" });
    }
  });
});

export default app;
