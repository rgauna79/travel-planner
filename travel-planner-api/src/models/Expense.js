import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: {
      type: String,
      enum: ["lodging", "transport", "food", "other"],
      default: "other",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
