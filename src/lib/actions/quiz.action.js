"use server";

import Quiz from "@/models/Quiz";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "../dbConnect";
import { objectId } from "../utils";

export async function createQuiz({ courseId, data }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    await Quiz.create({
      ...data,
      instructor: objectId(userId),
      course: courseId,
    });
    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "Quiz created successfully",
      }),
    );
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw new Error("Failed to create quiz");
  }
}
