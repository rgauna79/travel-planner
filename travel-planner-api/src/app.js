import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/user.routes.js";
import tripRoutes from "./routes/trip.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "https://mwrjsz-5173.csb.app";

console.log("Frontend URL >> ", FRONTEND_URL)
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/activities", activityRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
