import mongoose from "mongoose";

// Define the additional instructor information schema
const instructorInfoSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    address: {
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    experience: {
      type: String,
      required: true,
    },
    motivation: {
      type: String,
      required: true,
    },
    teachingStyle: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// Check if the model already exists, if not create it
export default mongoose.models?.InstructorInfo ||
  mongoose.model("InstructorInfo", instructorInfoSchema);
