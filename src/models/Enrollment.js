import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
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
  enrolledAt: { type: Date, default: Date.now }, // Enrollment date
});

export default mongoose.models.Enrollment ||
  mongoose.model("Enrollment", enrollmentSchema);
