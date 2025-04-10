import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Quiz title
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    }, // Course ID
    questions: [
      {
        question: { type: String, required: true }, // Question text
        options: [{ type: String }], // Answer options
        correctAnswer: { type: String, required: true }, // Correct answer
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models?.Quiz || mongoose.model("Quiz", quizSchema);
