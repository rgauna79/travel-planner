import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyToken,
} from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/user.schema.js";

const router = express.Router();

router.post("/register", validateSchema(registerSchema), registerUser);

router.post("/login", validateSchema(loginSchema), loginUser);

router.get("/logout", logoutUser);

router.get("/check", verifyToken);

export default router;
