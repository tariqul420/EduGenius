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

export async function deleteCommentById(commentId, userId, path) {
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

    revalidatePath(path);

    return { delete: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { delete: false, error: "Server error" };
  }
}

export async function updateCommentById(
  commentId,
  userId,
  path,
  updatedComment,
) {
  try {
    await dbConnect();

    // Validate input
    if (!commentId || !userId || !updatedComment?.trim()) {
      return {
        success: false,
        status: 400,
        error: "Missing required fields",
      };
    }

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(commentId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return {
        success: false,
        status: 400,
        error: "Invalid ID format",
      };
    }

    const commentObjectId = new mongoose.Types.ObjectId(commentId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Update the comment with additional checks
    const result = await Comments.findOneAndUpdate(
      {
        _id: commentObjectId,
        user: userObjectId,
      },
      {
        $set: {
          comment: updatedComment.trim(),
          updatedAt: new Date(),
          wasEdited: true, // Flag to indicate comment was edited
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!result) {
      return {
        success: false,
        status: 404,
        error: "Comment not found or user not authorized",
      };
    }

    revalidatePath(path);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Update error:", error);

    return {
      success: false,
      status: 500,
      error: "Can't update message!",
    };
  }
}
