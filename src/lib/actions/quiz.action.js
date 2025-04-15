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

export async function getQuizzes({ page = 1, limit = 10 } = {}) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const aggregationPipeline = [
      // Match quizzes by instructor
      {
        $match: {
          instructor: objectId(userId),
        },
      },
      // Lookup course data
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course",
        },
      },
      // Unwind course array
      {
        $unwind: "$course",
      },
      // Lookup category data
      {
        $lookup: {
          from: "categories",
          localField: "course.category",
          foreignField: "_id",
          as: "course.category",
        },
      },
      // Unwind category array
      {
        $unwind: "$course.category",
      },
      // Project final shape
      {
        $project: {
          _id: 1,
          title: 1,
          "course.title": 1,
          "course.category.name": 1,
          studentsCount: { $size: "$course.students" },
        },
      },
      // Skip for pagination
      {
        $skip: (page - 1) * limit,
      },
      // Limit results
      {
        $limit: limit,
      },
    ];

    // Get total count using the same match condition
    const [totalCount] = await Quiz.aggregate([
      {
        $match: {
          instructor: objectId(userId),
        },
      },
      {
        $count: "total",
      },
    ]);

    const totalQuizzes = totalCount?.total || 0;
    const totalPages = Math.ceil(totalQuizzes / limit);

    // Execute main aggregation
    const quizzes = await Quiz.aggregate(aggregationPipeline);

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
