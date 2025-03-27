"use server";
import Comments from "@/models/Comments";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";

export async function postComment({ blog, user, comment, path }) {
  try {
    await dbConnect();

    const newComment = Comments.create({
      blog: new mongoose.Types.ObjectId(blog),
      user: new mongoose.Types.ObjectId(user),
      comment: comment,
    });

    revalidatePath(path);
    return JSON.parse(JSON.stringify(newComment));
  } catch (err) {
    console.error("Error creating comment:", err);
  }
}

export async function getCommentsByBlogId(blogId) {
  try {
    await dbConnect();

    // Validate blogId
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return [];
    }

    // Convert string ID to ObjectId
    const objectId = new mongoose.Types.ObjectId(blogId);

    // Find comments with user population and sorting
    const comments = await Comments.find({ blog: objectId })
      .populate("user", "email profilePicture firstName lastName")
      .sort({ createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export async function deleteCommentById(commentId, userId) {
  try {
    await dbConnect();
    // Validate blogId
    if (!mongoose.Types.ObjectId.isValid(commentId)) return;

    // Convert string ID to ObjectId
    const commentObjectId = new mongoose.Types.ObjectId(commentId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const result = await Comments.findOneAndDelete({
      _id: commentObjectId,
      user: userObjectId,
    });

    if (!result) {
      return {
        delete: false,
        status: 400,
        error: "Comment not found or not authorized",
      };
    }

    return res.status(200).json({ delete: true });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ delete: false, error: "Server error" });
  }
}
