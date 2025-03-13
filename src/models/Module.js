const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Module title
    description: { type: String }, // Module description
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    }, // Course ID
    order: { type: Number, required: true }, // Module order in the course
  },
  { timestamps: true }
);

export default mongoose.models.Module || mongoose.model("Module", moduleSchema);
