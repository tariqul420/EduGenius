import { clerkClient } from "@clerk/nextjs/server";
import mongoose from "mongoose";

const instructorInfoSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: { type: String, required: true },
    expertise: { type: String, required: true },
    profession: { type: String, required: true },
    education: { type: String, required: true },
    address: {
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    experience: { type: String, required: true },
    motivation: { type: String, required: true },
    teachingStyle: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "terminated"],
      required: true,
      default: "pending",
    },
  },
  { timestamps: true },
);

instructorInfoSchema.post("findOneAndUpdate", async function (doc) {
  try {
    if (!doc) {
      console.error("No document provided to middleware");
      return;
    }

    if (doc.status === "approved") {
      const user = await mongoose
        .model("User")
        .findByIdAndUpdate(doc.student, { role: "instructor" }, { new: true });

      if (!user) {
        console.error("User not found for student ID:", doc.student);
        return;
      }

      if (!user.clerkUserId) {
        console.error("User missing clerkUserId:", user._id);
        return;
      }

      const client = await clerkClient();
      await client.users.updateUser(user.clerkUserId, {
        publicMetadata: {
          userId: user._id,
          role: user.role || "student",
        },
      });

      const existingInstructor = await mongoose
        .model("Instructor")
        .findOne({ instructorId: user._id });

      if (!existingInstructor) {
        await mongoose.model("Instructor").create({ instructorId: user._id });
      } else {
      }
    }

    if (doc.status === "terminated") {
      const user = await mongoose
        .model("User")
        .findByIdAndUpdate(doc.student, { role: "student" }, { new: true });

      if (!user) {
        console.error("User not found for student ID:", doc.student);
        return;
      }

      if (!user.clerkUserId) {
        console.error("User missing clerkUserId:", user._id);
        return;
      }

      // Update user role in Clerk
      const client = await clerkClient();
      await client.users.updateUser(user.clerkUserId, {
        publicMetadata: {
          userId: user._id,
          role: user.role || "student",
        },
      });

      // Remove instructor record
      await mongoose
        .model("Instructor")
        .findOneAndDelete({ instructorId: user._id });

      // Delete ALL courses by this instructor (not just one)
      await mongoose.model("Course").deleteMany({ instructor: user._id });

      await mongoose
        .model("InstructorInfo")
        .findOneAndDelete({ student: user._id });
    }
  } catch (error) {
    console.error("Middleware error:", error);
    throw error; // Ensure errors are propagated
  }
});

export default mongoose.models?.InstructorInfo ||
  mongoose.model("InstructorInfo", instructorInfoSchema);
