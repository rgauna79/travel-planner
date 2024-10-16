import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/user.routes.js";
// import tripRoutes from "./routes/trip.routes.js";
// import expenseRoutes from "./routes/expense.routes.js";
// import activityRoutes from "./routes/activity.routes.js";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "";

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/users", userRoutes);
// app.use("/api/trips", tripRoutes);
// app.use("/api/expenses", expenseRoutes);
// app.use("/api/activities", activityRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
