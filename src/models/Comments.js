import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Comment ||
  mongoose.model("Comment", commentSchema);
