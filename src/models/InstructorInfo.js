import { clerkClient } from "@clerk/nextjs/server";
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

instructorInfoSchema.post("findOneAndUpdate", async function (doc) {
  try {
    if (doc.status === "approved") {
      const user = await mongoose
        .model("User")
        .findByIdAndUpdate(
          { _id: doc.student },
          { role: "instructor" },
          { new: true },
        );

      if (user) {
        const client = await clerkClient();

        await client.users.updateUser(user.clerkUserId, {
          publicMetadata: {
            role: "instructor",
          },
        });

        await mongoose.model("Instructor").create({ instructorId: user._id });
      }
    }
  } catch (error) {}
});

// Check if the model already exists, if not create it
export default mongoose.models?.InstructorInfo ||
  mongoose.model("InstructorInfo", instructorInfoSchema);
