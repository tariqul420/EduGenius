"use server";

import Quiz from "@/models/Quiz";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
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

export async function updateQuiz({ quizId, data, path }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    await Quiz.findByIdAndUpdate(quizId, data, { new: true });

    if (String(quiz.instructor) !== String(userId)) {
      throw new Error("You are not authorized to update this quiz");
    }

    revalidatePath(path);
    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "Quiz updated successfully",
      }),
    );
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw new Error("Failed to update quiz");
  }
}

export async function deleteQuiz(quizId) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw new Error("Quiz not found");
    }

    if (String(quiz.instructor) !== String(userId)) {
      throw new Error("You are not authorized to delete this quiz");
    }

    await Quiz.findByIdAndDelete(quizId);
    return JSON.parse(
      JSON.stringify({
        success: true,
        message: "Quiz deleted successfully",
      }),
    );
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw new Error("Failed to delete quiz");
  }
}

export async function getQuizById(courseId) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const quiz = await Quiz.findOne({ course: courseId });
    if (!quiz) {
      return null;
    }

    if (String(quiz.instructor) !== String(userId)) {
      throw new Error("You are not authorized to view this quiz");
    }

    return JSON.parse(JSON.stringify(quiz));
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw new Error("Failed to fetch quiz");
  }
}

export async function getQuizzesByCourseId({ page = 1, limit = 10 } = {}) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Get total count
    const totalQuizzes = await Quiz.countDocuments({
      instructor: objectId(userId),
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalQuizzes / limit);

    // Get paginated quizzes
    const quizzes = await Quiz.find({ instructor: objectId(userId) })
      .populate({
        path: "course",
        select: "title students category",
        populate: [
          {
            path: "students",
            select: "students",
          },
          {
            path: "category",
            select: "name",
          },
        ],
      })
      .select("title")
      .skip((page - 1) * limit)
      .limit(limit);

    return JSON.parse(
      JSON.stringify({
        quizzes,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalQuizzes,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      }),
    );
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw new Error("Failed to fetch quizzes");
  }
}
