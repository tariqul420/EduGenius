import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Course title
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
    category: { type: String, required: true }, // Course category (e.g., Programming, Design)
    thumbnail: { type: String }, // Course thumbnail URL
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
