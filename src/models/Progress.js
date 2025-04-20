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

    modules: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      isFinished: { type: Boolean, required: true, default: false },
    },

    Lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
        isFinished: { type: Boolean, required: true, default: false },
      },
    ], // Completed lessons
    quizScores: {
      quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }, // Quiz ID
      score: { type: Number, required: true }, // Quiz score
    },

    assignmentScore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      result: { type: Number, required: true },
    },
  },
  { timestamps: true },
);

export default mongoose.models?.Progress ||
  mongoose.model("Progress", progressSchema);
