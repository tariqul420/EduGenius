"use server";
import Comments from "@/models/Comments";
import dbConnect from "../dbConnect";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function postComment({ blog, user, comment, path }) {
    try {
        await dbConnect();

        const newComment = Comments.create({
            blog: new mongoose.Types.ObjectId(blog),
            user: new mongoose.Types.ObjectId(user),
            comment: comment
        });

        revalidatePath(path)
        return JSON.parse(JSON.stringify(newComment))
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
            .populate('user', 'email profilePicture firstName lastName')
            .sort({ createdAt: -1 })
            .lean();

        return comments;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
}