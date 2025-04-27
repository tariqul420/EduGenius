import mongoose from "mongoose";
import slugify from "slugify";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Quiz title
    slug: { type: String, unique: true, require: true }, // Unique slug for the quiz
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

// Pre-save middleware to generate a unique slug
quizSchema.pre("save", async function () {
  if (this.isModified("title")) {
    let slug = slugify(this.title, { lower: true, strict: true });
    const existingQuiz = await mongoose.models.Quiz.findOne({ slug });

    if (existingQuiz) {
      const uniqueSuffix = Date.now().toString(36);
      slug = `${slug}-${uniqueSuffix}`;
    }

    this.slug = slug;
  }
});

export default mongoose.models?.Quiz || mongoose.model("Quiz", quizSchema);
