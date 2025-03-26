import dbConnect from "@/lib/dbConnect";
import Comments from "@/models/Comments";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// app/api/blog-comment/route.js
export async function POST(req) {
    await dbConnect();

    try {
        const comment = await req.json();

        // Validate required fields
        if (!comment?.blog || !comment?.user || !comment?.comment) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check for duplicate comment
        const existingComment = await Comments.findOne({
            blog: comment.blog,
            user: comment.user,
            comment: comment.comment,
            createdAt: { $gt: new Date(Date.now() - 60000) } // Within last minute
        });

        if (existingComment) {
            return NextResponse.json(
                { success: false, error: "Duplicate comment detected" },
                { status: 400 }
            );
        }

        const newComment = new Comments({
            blog: new mongoose.Types.ObjectId(comment.blog),
            user: new mongoose.Types.ObjectId(comment.user),
            comment: comment.comment
        });

        await newComment.save();

        return NextResponse.json(
            { success: true, data: newComment },
            { status: 201 }
        );
    } catch (err) {
        console.error("Error creating comment:", err);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to create comment",
                message: err.message
            },
            { status: 500 }
        );
    }
}