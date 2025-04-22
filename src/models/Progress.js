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
      isFinished: { type: Boolean, default: false },
    },

    Lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ], // Completed lessons
    quizScores: {
      quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }, // Quiz ID
      score: { type: Number }, // Quiz score
    },

    assignmentScore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      result: { type: Number },
    },
  },
  { timestamps: true },
);

progressSchema.post("findOneAndUpdate", async function (doc) {
  try {
    // Get all lessons for this module
    const curriculum = await mongoose.model("Module").findById(doc.modules);
    const totalLessons = curriculum.lessons.length;

    // Count completed lessons
    const completedLessons = doc.Lessons.filter((lesson) =>
      module.lessons.includes(lesson),
    ).length;

    // If all lessons are completed, mark module as finished
    if (completedLessons === totalLessons) {
      await mongoose.model("Progress").findOneAndUpdate(
        { student: doc.student, course: doc.course, modules: doc.modules },
        {
          isFinished: true,
        },
        { new: true },
      );
    }
  } catch (error) {
    console.error("Error in post findOneAndUpdate:", error);
  }
});

export default mongoose.models?.Progress ||
  mongoose.model("Progress", progressSchema);
