import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    category: {
      type: String,
      enum: ["transport", "food", "tourism", "other"],
      default: "other",
    },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
