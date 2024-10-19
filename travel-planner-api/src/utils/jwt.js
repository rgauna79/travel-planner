import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";

export const createUserToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token." });
    req.user = user;
    next();
  });
};
