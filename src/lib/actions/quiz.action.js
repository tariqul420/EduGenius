"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import dbConnect from "../dbConnect";
import { objectId } from "../utils";

import Quiz from "@/models/Quiz";

export async function createQuiz({ courseId, data, path }) {
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

    // Revalidate the path before returning
    revalidatePath(path);

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

    const quiz = await Quiz.findByIdAndUpdate(quizId, data, { new: true });

    if (!quiz) return;
    const questions = quiz.questions.length > 0;
    if (questions) return;
    await Quiz.findByIdAndDelete(quiz._id);

    revalidatePath(path);
    return { success: true, message: "Quiz updated successfully" };
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw new Error("Failed to update quiz");
  }
}

export async function deleteQuiz(quizId, path) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    const role = sessionClaims?.role;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw new Error("Quiz not found");
    }

    if (String(quiz.instructor) !== String(userId) && role !== "admin") {
      throw new Error("You are not authorized to delete this quiz");
    }

    await Quiz.findByIdAndDelete(quizId);

    revalidatePath(
      role === "admin"
        ? `/admin/courses/${path}`
        : `/instructor/courses/${path}`,
    );
    return { success: true };
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
    const role = sessionClaims?.role;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const quiz = await Quiz.findOne({ course: courseId });
    if (!quiz) {
      return null;
    }

    if (String(quiz.instructor) !== String(userId) && role !== "admin") {
      throw new Error("You are not authorized to delete this quiz");
    }

    return JSON.parse(JSON.stringify(quiz));
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw new Error("Failed to fetch quiz");
  }
}

// get Quizzes by instructors
export async function getQuizzes({ page = 1, limit = 10, search = "" } = {}) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Create search match stage
    const searchMatch = search
      ? {
          $match: {
            title: { $regex: search, $options: "i" },
          },
        }
      : { $match: {} };

    const aggregationPipeline = [
      // Match quizzes by instructor
      {
        $match: {
          instructor: objectId(userId),
        },
      },
      // Apply search filter on title
      searchMatch,
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
          studentsCount: { $size: { $ifNull: ["$course.students", []] } },
        },
      },
      // Sort by title for consistent ordering
      {
        $sort: { title: 1 },
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

    // Get total count using the same match and search conditions
    const [totalCount] = await Quiz.aggregate([
      {
        $match: {
          instructor: objectId(userId),
        },
      },
      searchMatch,
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
