import mongoose from "mongoose";

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

export default mongoose.models?.Module ||
  mongoose.model("Module", moduleSchema);
