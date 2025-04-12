import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Quiz title
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Instructor ID
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    }, // Course ID
    questions: [
      {
        question: { type: String, required: true }, // Question text
        options: [
          {
            option: { type: String, required: true }, // Option text
            isCorrect: { type: Boolean, required: true, default: false }, // Whether the option is correct
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models?.Quiz || mongoose.model("Quiz", quizSchema);
