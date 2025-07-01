"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import dbConnect from "../db-connect";
import { objectId } from "../utils";

import Review from "@/models/Review";

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
        course,
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

export async function getSingleCourseReview({ course, page = 1, limit = 3 }) {
  try {
    await dbConnect();

    const review = await Review.find({
      course: objectId(course),
    })
      .populate("student", "email profilePicture firstName lastName")
      .sort({ createdAt: -1 })
      .limit(limit * page)
      .lean();

    const total = await Review.countDocuments({ course: objectId(course) });
    const hasNextPage = total > limit * page;

    return {
      reviews: JSON.parse(JSON.stringify(review)),
      total,
      hasNextPage,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
