import mongoose from "mongoose";
import slugify from "slugify";
import Instructor from "./Instructor";
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
// courseSchema.post("save", async function (doc) {
//   console.log("Post-save middleware triggered");
//   console.log("Post-save  Course ID:", doc);
//   console.log(
//     `Post-save  Query took ${Date.now() - doc.instructor} ${doc._id}`,
//   );
//   const instructor = await Instructor.findOne({
//     instructorId: doc.instructor,
//   });

//   console.log("Post-save middleware instructor:", instructor);
// });

// Method to update the instructor's courses array
courseSchema.methods.updateInstructorCourses = async function () {
  try {
    if (!this.instructor) {
      console.error("Instructor ID is undefined");
      return;
    }

    // Update the instructor's courses array
    await Instructor.findOneAndUpdate(
      { instructorId: this.instructor },
      { $addToSet: { courses: this._id } }, // Use $addToSet to avoid duplicates
      { upsert: true }, // Create the document if it doesn't exist
    );
  } catch (error) {
    console.error("Error in updateInstructorCourses method:", error);
    throw error;
  }
};

// Post-save middleware to update the instructor's average rating
courseSchema.post("update", async function () {
  const Course = mongoose.model("Course");
  const Instructor = mongoose.model("Instructor");

  // Use aggregation to calculate the average rating of all courses by the instructor
  const result = await Course.aggregate([
    { $match: { instructor: this.instructor } }, // Match courses by instructor ID
    { $unwind: "$ratings" }, // Deconstruct the ratings array
    {
      $group: {
        _id: "$instructor",
        averageRating: { $avg: "$ratings.rating" }, // Calculate the average rating
      },
    },
  ]);

  // Update the instructor's rating
  if (result.length > 0) {
    const averageRating = result[0].averageRating; // Round to 1 decimal place
    await Instructor.findOneAndUpdate(
      { instructorId: this.instructor },
      { rating: averageRating },
    );
  }
});

// Middleware to add a student to the course and instructor when a course is purchased
courseSchema.methods.enrollment = async function (studentId, instructorId) {
  try {
    // Add the student to the course's students array if not already added
    if (!this.students.includes(studentId)) {
      this.students.push(studentId);
      await this.save();
      console.log("Student added to course:", studentId);
    }

    // Add the student to the instructor's students array if not already added
    const instructorUpdate = await Instructor.findOneAndUpdate(
      { instructorId: instructorId },
      { instructorId: instructorId },
      { $addToSet: { students: studentId } }, // Use $addToSet to avoid duplicates
      { upsert: true },
    );

    if (!instructorUpdate) {
      console.error("Failed to update instructor:", this.instructor);
    } else {
      console.log("Instructor updated successfully:", this.instructor);
    }

    // Update or create the Student document
    const studentUpdate = await Student.findOneAndUpdate(
      { studentId, courses: { $ne: this._id } }, // Find the student by their ID
      { $addToSet: { courses: this._id } }, // Add the course to the courses array if it doesn't already exist
      { upsert: true }, // Create a new document if it doesn't exist, and return the updated document
    );

    if (!studentUpdate) {
      console.error("Failed to update student:", studentId);
    } else {
      console.log("Student updated successfully:", studentId);
    }
  } catch (error) {
    console.error("Error in enrollment method:", error);
    throw error;
  }
};

export default mongoose.models?.Course ||
  mongoose.model("Course", courseSchema);
