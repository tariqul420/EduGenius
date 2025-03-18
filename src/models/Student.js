import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    balance: {
      type: Number,
      default: 0,
      min: [1, "Balance must be above 1.0"],
    },
  },
  { timestamps: true },
);

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
