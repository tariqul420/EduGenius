import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true },
);

export default mongoose.models?.Student ||
  mongoose.model("Student", studentSchema);
