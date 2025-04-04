import mongoose from "mongoose";

const catchSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    species: { type: String, required: true },
    weight: { type: Number, required: true },
    length: { type: Number, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Catch", catchSchema);
