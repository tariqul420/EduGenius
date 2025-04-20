import mongoose from "mongoose";
import slugify from "slugify";

import Lesson from "./Lesson";

const moduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Module title
    slug: { type: String, unique: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    }, // Course ID
  },
  { timestamps: true },
);

// Pre-save middleware to generate a unique slug
moduleSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    let slug = slugify(this.name, { lower: true, strict: true });
    const existingCourse = await mongoose.models.Course.findOne({ slug });

    if (existingCourse) {
      const uniqueSuffix = Date.now().toString(36);
      slug = `${slug}-${uniqueSuffix}`;
    }

    this.slug = slug;
  }
  next();
});

moduleSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (doc) {
      await Lesson.deleteMany({ module: doc._id });
    }
  } catch (error) {
    console.error("Error deleting module:", error);
  }
});

export default mongoose.models?.Module ||
  mongoose.model("Module", moduleSchema);
