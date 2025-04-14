"use server";

import Review from "@/models/Review";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";
import { objectId } from "../utils";

export async function saveReview({ reviewData }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Add the userId as the instructor for the course
    const newCourse = new Review({
      ...reviewData,
      student: userId,
    });

    await newCourse.save();

    revalidatePath("/student/course");
    return JSON.parse(JSON.stringify(newCourse));
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}

export async function getReview({ course }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const review = await Review.findOne(
      {
        student: objectId(userId),
        course: objectId(course),
      },
      { review: 1, rating: 1, _id: 0 },
    );

    return JSON.parse(JSON.stringify(review));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateReview({ rating, review, course }) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Update the comment
    const result = await Review.findOneAndUpdate(
      {
        student: userId,
        course: course,
      },
      {
        $set: {
          rating,
          review,
        },
      },
    );

    if (!result) {
      return {
        success: false,
        status: 404,
        error: "Review not found or user not authorized",
      };
    }

    revalidatePath("/student/course");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
