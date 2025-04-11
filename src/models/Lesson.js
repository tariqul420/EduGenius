import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Lesson title
    videoUrl: { type: String }, // Video URL (if applicable)
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    }, // Course ID
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    }, // Module ID
    isFinished: { type: Boolean, required: true, default: false }, // Lesson order in the module
  },
  { timestamps: true },
);

export default mongoose.models?.Lesson ||
  mongoose.model("Lesson", lessonSchema);
