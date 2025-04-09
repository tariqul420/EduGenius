import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Lesson title
    content: { type: String, required: true }, // Lesson content (HTML or Markdown)
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
    order: { type: Number, required: true }, // Lesson order in the module
  },
  { timestamps: true },
);

export default mongoose.models?.Lesson ||
  mongoose.model("Lesson", lessonSchema);
