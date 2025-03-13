import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, required: true, unique: true }, // Clerk user ID
    email: { type: String, required: true, unique: true }, // Clerk email
    firstName: { type: String }, // Clerk first name
    lastName: { type: String }, // Clerk last name
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
      required: true,
    }, // User role
    profilePicture: { type: String }, // Clerk profile picture URL
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
