import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    notes: { type: String },
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
