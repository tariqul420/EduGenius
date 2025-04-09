import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Student ID
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    }, // Course ID
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }], // Completed lessons
    quizScores: [
      {
        quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }, // Quiz ID
        score: { type: Number, required: true }, // Quiz score
      },
    ],
    progressPercentage: { type: Number, default: 0 }, // Overall progress percentage
  },
  { timestamps: true },
);

export default mongoose.models?.Progress ||
  mongoose.model("Progress", progressSchema);
