import express from "express";
import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} from "../controllers/trip.controller.js";
import { tripSchema } from "../schemas/trip.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { authenticateToken } from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

router.use(authenticateToken);

router.post("/", validateSchema(tripSchema), createTrip);

router.get("/", authenticateToken, getTrips);

router.get("/:id", authenticateToken, getTripById);

router.put("/:id", validateSchema(tripSchema), updateTrip);

router.delete("/:id", deleteTrip);

export default router;
