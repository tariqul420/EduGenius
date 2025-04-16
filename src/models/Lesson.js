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
lessonSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (doc) {
      const lessons = await mongoose
        .model("Lesson")
        .findOne({ module: doc.module });
      if (lessons) return;
      await mongoose.model("Module").findOneAndDelete({ _id: doc.module });
    }
  } catch (error) {
    console.error("Error deleting module:", error);
  }
});
export default mongoose.models?.Lesson ||
  mongoose.model("Lesson", lessonSchema);
