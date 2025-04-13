import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema(
  {
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    social: {
      facebook: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      instagram: { type: String },
    },

    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true },
);

export default mongoose.models?.Instructor ||
  mongoose.model("Instructor", instructorSchema);
