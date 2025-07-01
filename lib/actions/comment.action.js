"use server";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import dbConnect from "../db-connect";

import Comments from "@/models/comment.model";

export async function postComment({ blog, user, comment, path }) {
  try {
    await dbConnect();

    const newComment = Comments.create({
      blog: new mongoose.Types.ObjectId(blog),
      user: new mongoose.Types.ObjectId(user),
      comment,
    });

    revalidatePath(path);
    return JSON.parse(JSON.stringify(newComment));
  } catch (err) {
    console.error("Error creating comment:", err);
  }
}

export async function getCommentsByBlogId({
  blogId,
  page = 1,
  limit = 3,
} = {}) {
  try {
    await dbConnect();

    // Validate blogId
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return { comments: [], total: 0, hasNextPage: false };
    }

    // Convert string ID to ObjectId
    const objectId = new mongoose.Types.ObjectId(blogId);

    // Find comments with user population, sorting, and limit
    const comments = await Comments.find({ blog: objectId })
      .populate("user", "email profilePicture firstName lastName")
      .sort({ createdAt: -1 })
      .limit(limit * page)
      .lean();

    const total = await Comments.countDocuments({ blog: objectId });
    const hasNextPage = total > limit * page;

    return {
      comments: JSON.parse(JSON.stringify(comments)),
      total,
      hasNextPage,
    };
  } catch (error) {
    console.error("Error fetching comments:", error);
    // Note: getInstructors doesn't return a default value here
  }
}

export async function deleteCommentById(commentId, userId, path) {
  try {
    await dbConnect();

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

    // Update the comment
    const result = await Comments.findOneAndUpdate(
      {
        _id: commentObjectId,
        user: userObjectId,
      },
      {
        $set: {
          comment: updatedComment,
        },
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
