import mongoose from "mongoose";
import slugify from "slugify";
import Instructor from "./Instructor";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true }, // Course title
    description: { type: String, required: true }, // Course description
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async function (value) {
          const user = await mongoose.model("User").findById(value);
          return user && user.role === "instructor";
        },
        message: "Instructor must have the role of 'instructor'.",
      },
    }, // Instructor ID
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Course category (e.g., Programming, Design)
    thumbnail: { type: String, required: true }, // Course thumbnail URL
    language: { type: String, required: true }, // Course language (e.g., English, Spanish)
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    }, // Course level (e.g., Beginner, Intermediate, Advanced)
    discount: { type: Number, default: 0 }, // Discount percentage
    price: { type: Number, required: true }, // Course price
    duration: { type: Number, default: 0 },
    slug: { type: String, unique: true },
    ratings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: {
          type: Number,
          required: true,
          min: [1, "Rating must be above 1.0"],
          max: [5, "Rating must be below 5.0"],
          set: (val) => Math.round(val * 10) / 10,
        },
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
          validator: async function (value) {
            const user = await mongoose.model("User").findById(value);
            return user && user.role === "student";
          },
          message: "Student must have the role of 'student'.",
        },
      },
    ],
  },
  { timestamps: true },
);

// Pre-save middleware to generate a unique slug
courseSchema.pre("save", async function (next) {
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

// when a course is created or updated
courseSchema.post("save", async function (doc) {
  // Update the instructor's courses array
  await Instructor.findOneAndUpdate(
    { instructorId: doc.instructor },
    { $addToSet: { courses: doc._id } }, // Use $addToSet to avoid duplicates
    { upsert: true }, // Create the document if it doesn't exist
  );
});

export default mongoose.models?.Course ||
  mongoose.model("Course", courseSchema);
