import mongoose from "mongoose";

import Assignment from "./Assignment";
import User from "./User"; // Assuming you have a User model

const assignmentSubmissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    mark: {
      type: Number,
      default: 0,
    },
    feedback: {
      type: String,
      default: "",
    },
    submissionDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Pre-save middleware to validate assignment and student existence
assignmentSubmissionSchema.pre("save", async function (next) {
  try {
    // Validate assignment
    if (this.isModified("assignment")) {
      const assignment = await Assignment.findById(this.assignment);
      if (!assignment) {
        throw new Error("Assignment not found");
      }
    }
    // Validate student
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

export default mongoose.models.AssignmentSubmission ||
  mongoose.model("AssignmentSubmission", assignmentSubmissionSchema);
