import mongoose from "mongoose";
import slugify from "slugify";
import Assignment from "./Assignment";
import Certificate from "./Certificate";
import Instructor from "./Instructor";
import Lesson from "./Lesson";
import Module from "./Module";
import Payment from "./Payment";
import Progress from "./Progress";
import Quiz from "./Quiz";
import Rating from "./Rating";
import Student from "./Student";

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
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
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

// Post middleware trigger when findOneAndDelete to update and delete related documents
courseSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (!doc) {
      console.error("No document found to delete.");
      return;
    }

    console.log("Post-findOneAndDelete middleware triggered");
    console.log("Deleted Course ID:", doc._id);

    // Remove the course from the instructor's courses array
    try {
      await Instructor.findOneAndUpdate(
        { courses: doc._id },
        { $pull: { courses: doc._id } },
      );
      console.log("Removed course from instructor's courses array");
    } catch (error) {
      console.error(
        "Error removing course from instructor's courses array:",
        error,
      );
    }

    // Remove the course from all students' enrolled courses
    try {
      await Student.updateMany(
        { courses: doc._id },
        { $pull: { courses: doc._id } },
      );
      console.log("Removed course from students' enrolled courses");
    } catch (error) {
      console.error(
        "Error removing course from students' enrolled courses:",
        error,
      );
    }

    // Delete lessons associated with the course
    try {
      await Lesson.deleteMany({ course: doc._id });
      console.log("Deleted lessons associated with the course");
    } catch (error) {
      console.error(
        "Error deleting lessons associated with the course:",
        error,
      );
    }

    // Delete modules associated with the course
    try {
      await Module.deleteMany({ course: doc._id });
      console.log("Deleted modules associated with the course");
    } catch (error) {
      console.error(
        "Error deleting modules associated with the course:",
        error,
      );
    }

    // Delete payments associated with the course
    try {
      await Payment.deleteMany({ course: doc._id });
      console.log("Deleted payments associated with the course");
    } catch (error) {
      console.error(
        "Error deleting payments associated with the course:",
        error,
      );
    }

    // Delete progress associated with the course
    try {
      await Progress.deleteMany({ course: doc._id });
      console.log("Deleted progress associated with the course");
    } catch (error) {
      console.error(
        "Error deleting progress associated with the course:",
        error,
      );
    }

    // Delete ratings associated with the course
    try {
      await Rating.deleteMany({ course: doc._id });
      console.log("Deleted ratings associated with the course");
    } catch (error) {
      console.error(
        "Error deleting ratings associated with the course:",
        error,
      );
    }

    // Delete certificates associated with the course
    try {
      await Certificate.deleteMany({ course: doc._id });
      console.log("Deleted certificates associated with the course");
    } catch (error) {
      console.error(
        "Error deleting certificates associated with the course:",
        error,
      );
    }

    // Delete quizzes associated with the course
    try {
      await Quiz.deleteMany({ course: doc._id });
      console.log("Deleted quizzes associated with the course");
    } catch (error) {
      console.error(
        "Error deleting quizzes associated with the course:",
        error,
      );
    }

    // Delete assignments associated with the course
    try {
      await Assignment.deleteMany({ course: doc._id });
      console.log("Deleted assignments associated with the course");
    } catch (error) {
      console.error(
        "Error deleting assignments associated with the course:",
        error,
      );
    }
  } catch (error) {
    console.error("Error in post-findOneAndDelete middleware:", error);
  }
});

export default mongoose.models?.Course ||
  mongoose.model("Course", courseSchema);
