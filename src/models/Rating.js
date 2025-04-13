import mongoose from "mongoose";
import Course from "./Course";

const ratingSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    review: {
      type: String,
      min: [5, "Review must be at least 5 characters long."],
      max: [500, "Review cannot exceed 500 characters."],
    },
  },
  { timestamps: true },
);

ratingSchema.post("save", async function (doc) {
  try {
    await Course.findOneAndUpdate(
      { _id: doc.course },
      { $addToSet: { ratings: doc._id } },
    );
  } catch (error) {
    console.error(error);
  }
});

export default mongoose.models?.Rating ||
  mongoose.model("Rating", ratingSchema);
