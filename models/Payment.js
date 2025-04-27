/* eslint-disable no-shadow */
import mongoose from "mongoose";

import Course from "./Course";
import Instructor from "./Instructor";
import Notification from "./Notification";
import Progress from "./Progress";
import Student from "./Student";
import User from "./User";

const paymentSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true, unique: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

// Pre-save middleware to validate course and student existence
paymentSchema.pre("save", async function (next) {
  try {
    if (this.isModified("course")) {
      const course = await Course.findById(this.course);
      if (!course) {
        throw new Error("Course not found");
      }
    }
    if (this.isModified("student")) {
      const student = await User.findById(this.student);
      if (!student || student.role !== "student") {
        throw new Error("Student not found or invalid role");
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Post-save middleware to add student to course and handle notifications
paymentSchema.post("save", async function (doc) {
  try {
    // Fetch course with instructor populated
    const course = await Course.findById(doc.course).populate("instructor");
    if (!course) {
      throw new Error("Course not found after payment save");
    }

    const student = await User.findById(doc.student);
    if (!student) {
      throw new Error("Student not found after payment save");
    }

    const instructorId = course.instructor._id;
    const studentId = doc.student;

    // Update Course, Instructor, Student, and Progress
    await Promise.all([
      Course.findOneAndUpdate(
        { _id: course._id },
        { $addToSet: { students: studentId } },
        { upsert: true },
      ),
      Instructor.findOneAndUpdate(
        { instructorId },
        { $addToSet: { students: studentId } },
        { upsert: true },
      ),
      Student.findOneAndUpdate(
        { student: studentId },
        { $addToSet: { courses: course._id } },
        { upsert: true },
      ),
      Progress.create({
        student: studentId,
        course: course._id,
      }),
    ]);

    // Find existing purchase notification for this course
    const existingNotification = await Notification.findOne({
      course: doc.course,
      type: "purchase",
    });

    if (existingNotification) {
      // Update existing notification's recipient array
      const updatePromises = [];

      // Add studentId if not already in recipient
      if (!existingNotification.recipient.includes(studentId)) {
        updatePromises.push(
          Notification.findOneAndUpdate(
            { _id: existingNotification._id },
            {
              $addToSet: { recipient: studentId },
            },
            { new: true },
          ),
        );
      }

      if (updatePromises.length > 0) {
        await Promise.all(updatePromises);
      }
    } else {
      // Create new notifications for student and instructor
      const notifications = [
        new Notification({
          recipient: [studentId],
          sender: instructorId,
          course: doc.course,
          type: "purchase",
          readBy: [],
        }),
      ];

      await Promise.all(notifications.map((n) => n.save()));
    }
  } catch (error) {
    console.error("Error in payment post-save middleware:", error);
    throw error; // Rethrow to allow upstream handling
  }
});

export default mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);
