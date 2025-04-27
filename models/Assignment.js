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
    submissions: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Student ID
        submissionDate: { type: Date, default: Date.now }, // Submission date
        fileUrl: { type: String }, // File URL (if applicable)
        grade: { type: Number }, // Assignment grade
        feedback: { type: String }, // Instructor feedback
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", assignmentSchema);
