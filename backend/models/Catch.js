// models/Catch.ts
import mongoose from "mongoose";

const catchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fisherman: {
    type: String,
    required: true,
  },
  fish: {
    type: String,
    enum: ["Abborre", "Gädda"],
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Catch", catchSchema);
