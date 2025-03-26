"use server";
import Comments from "@/models/Comments";
import dbConnect from "../dbConnect";
import mongoose from "mongoose";

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