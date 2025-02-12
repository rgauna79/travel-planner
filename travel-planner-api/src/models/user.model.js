import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferences: {
      theme: { type: String, default: "light" },
      language: { type: String, default: "en" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
