import mongoose from "mongoose";
import slugify from "slugify";

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Lesson title
    slug: { type: String, unique: true },
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
  },
  { timestamps: true },
);

// Pre-save middleware to generate a unique slug
lessonSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    let slug = slugify(this.title, { lower: true, strict: true });
    const existingCourse = await mongoose.models.Course.findOne({ slug });

    if (existingCourse) {
      const uniqueSuffix = Date.now().toString(36);
      slug = `${slug}-${uniqueSuffix}`;
    }

    this.slug = slug;
  }
  next();
});

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
