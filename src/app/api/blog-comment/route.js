import dbConnect from "@/lib/dbConnect";
import Comments from "@/models/Comments";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    await dbConnect();

    try {
        const comment = await req.json();
        const commentModify = { ...comment, blog: mongoose.ObjectId(comment?.blog) }

        const newComment = new Comments(comment);
        await newComment.save();

        // Return the saved comment with success status
        return NextResponse.json(
            { success: true, data: newComment },
            { status: 201 }
        );
    } catch (err) {
        console.error(err);

        // Return an error response with more details
        return NextResponse.json(
            {
                success: false,
                error: "Failed to create comment",
                message: err instanceof Error ? err.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}