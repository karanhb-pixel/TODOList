import express from "express";
import { getProfile } from "../controllers/profileController";
import authMiddleware from "../middleware/auth";

const router = express.Router();

// Protected GET route
router.get("/", authMiddleware, getProfile);

export default router;
