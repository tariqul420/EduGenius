import mongoose from "mongoose";
import User from "./User";

const instructorSchema = new mongoose.Schema(
  {
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    social: {
      facebook: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      instagram: { type: String },
    },

    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },

    students: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true },
);

export default mongoose.models?.Instructor ||
  mongoose.model("Instructor", instructorSchema);
