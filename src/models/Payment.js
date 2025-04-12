import mongoose from "mongoose";
import Course from "./Course";
import User from "./User";

const paymentSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true, unique: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: Course },
    student: { type: mongoose.Schema.Types.ObjectId, ref: User },
  },
  { timestamps: true },
);

// Pre-save middleware to validate course and student existence
paymentSchema.pre("save", async function (next) {
  if (this.isModified("course")) {
    const course = await Course.findById(this.course);
    if (!course) {
      throw new Error("Course not found");
    }
  }
  if (this.isModified("student")) {
    const student = await User.findById(this.student);
    if (!student) {
      throw new Error("Student not found");
    }
  }
  next();
});

// Post-save middleware to add student to the course
paymentSchema.post("save", async function (doc) {
  try {
    const course = await Course.findById(doc.course);
    if (!course) {
      throw new Error("Course not found after payment save");
    }

    // Use the addStudent method from the Course schema
    await course.enrollment(doc.student);
  } catch (error) {
    console.error("Error adding student to course after payment:", error);
    throw error; // Optionally rethrow the error to handle it upstream
  }
});

export default mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);
