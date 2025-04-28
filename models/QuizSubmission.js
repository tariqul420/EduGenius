import mongoose from "mongoose";

const quizSubmissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        selectedOptions: [
          {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
        ],
        isCorrect: {
          type: Boolean,
          default: false,
        },
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Calculate score before saving
quizSubmissionSchema.pre("save", async function (next) {
  if (this.isModified("answers")) {
    const quiz = await mongoose.model("Quiz").findById(this.quiz);

    let correctAnswers = 0;

    for (const answer of this.answers) {
      const question = quiz.questions.id(answer.question);

      if (question) {
        const correctOptionIds = question.options
          .filter((opt) => opt.isCorrect)
          .map((opt) => opt._id.toString());

        const selectedOptionIds = answer.selectedOptions.map((opt) =>
          opt.toString(),
        );

        // Check if all correct options are selected and no incorrect ones
        const isCorrect =
          correctOptionIds.length === selectedOptionIds.length &&
          correctOptionIds.every((id) => selectedOptionIds.includes(id));

        answer.isCorrect = isCorrect;
        if (isCorrect) correctAnswers++;
      }
    }

    this.score = correctAnswers;
    this.totalQuestions = quiz.questions.length;
    this.percentage = (correctAnswers / quiz.questions.length) * 100;
  }
  next();
});

// Indexes for better performance
quizSubmissionSchema.index({ student: 1, quiz: 1 }, { unique: true });
quizSubmissionSchema.index({ course: 1 });

export default mongoose.models?.QuizSubmission ||
  mongoose.model("QuizSubmission", quizSubmissionSchema);
