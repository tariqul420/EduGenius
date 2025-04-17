import mongoose from "mongoose";
import Lesson from "./Lesson";

const moduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Module title
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    }, // Course ID

    isFinished: { type: Boolean, required: true, default: false }, // Lesson order in the module
  },
  { timestamps: true },
);

moduleSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (doc) {
      await Lesson.deleteMany({ module: doc._id });
    }
  } catch (error) {
    console.error("Error deleting module:", error);
  }
});

export default mongoose.models?.Module ||
  mongoose.model("Module", moduleSchema);
