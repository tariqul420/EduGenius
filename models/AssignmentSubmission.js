import mongoose from "mongoose";

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

export default mongoose.models.AssignmentSubmission ||
  mongoose.model("AssignmentSubmission", assignmentSubmissionSchema);
