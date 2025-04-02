import jwt from "jsonwebtoken";
import { User } from "../model/User_model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user.toJSON();
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;
