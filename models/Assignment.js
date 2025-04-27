import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Assignment title
    deadline: { type: Date, required: true }, // Assignment deadline
    description: { type: String, required: true }, // Assignment description
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    }, // Course ID
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Instructor ID
    totalMarks: { type: Number, required: true }, // Total marks for the assignment
    passMarks: { type: Number }, // Marks required to pass
    submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", assignmentSchema);
