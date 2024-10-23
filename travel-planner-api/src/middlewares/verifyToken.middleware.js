import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    (authHeader && authHeader.split(" ")[1]) || req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user;
    next();
  });
};
