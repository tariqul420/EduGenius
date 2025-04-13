"use server";

import Rating from "@/models/Rating";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "../dbConnect";

export async function saveRating({ reviewData, path }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Add the userId as the instructor for the course
    const newCourse = new Rating({
      ...reviewData,
      student: userId,
    });
    await newCourse.save();

    // revalidatePath(path);
    return JSON.parse(JSON.stringify(newCourse));
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}
