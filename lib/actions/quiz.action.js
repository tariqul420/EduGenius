"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import dbConnect from "../dbConnect";
import { objectId } from "../utils";

import Quiz from "@/models/Quiz";
import QuizSubmission from "@/models/QuizSubmission";
import Student from "@/models/Student";
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
// get Quizzes by instructors =================
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

// export async function getQuizzesByCourses({ courseId, page = 1, limit = 10 }) {
//   try {
//     await dbConnect();

//     // Convert page and limit to numbers and ensure they are positive
//     const pageNum = parseInt(page, 10) || 1;
//     const limitNum = parseInt(limit, 10) || 10;
//     const skip = (pageNum - 1) * limitNum;

//     // Fetch quizzes with pagination
//     const quizzes = await Quiz.find({ course: objectId(courseId) })
//       .select("-questions.options.isCorrect")
//       .populate("instructor", "name") // Optional: Populate instructor name
//       .populate("course", "title") // Optional: Populate course title
//       .skip(skip)
//       .limit(limitNum)
//       .lean(); // Convert to plain JS object for better performance

//     // Get total number of quizzes for pagination metadata
//     const totalQuizzes = await Quiz.countDocuments({ course: courseId });

//     // If no quizzes found, return empty array with metadata
//     if (!quizzes.length && pageNum === 1) {
//       return {
//         quizzes: [],
//         pagination: {
//           totalQuizzes: 0,
//           totalPages: 0,
//           currentPage: pageNum,
//           limit: limitNum,
//         },
//       };
//     }

//     // Calculate total pages
//     const totalPages = Math.ceil(totalQuizzes / limitNum);

//     return {
//       quizzes,
//       pagination: {
//         totalQuizzes,
//         totalPages,
//         currentPage: pageNum,
//         limit: limitNum,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching quizzes by course ID:", error);
//     throw new Error(`Failed to fetch quizzes by course ID: ${error.message}`);
//   }
// }

// get quizzes by students
export async function getQuizzesForStudent({
  page = 1,
  limit = 10,
  search = "",
} = {}) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Create search match stage for quiz title
    const searchMatch = search
      ? {
          $match: {
            "quizzes.title": { $regex: search, $options: "i" },
          },
        }
      : { $match: {} };

    // Aggregation pipeline
    const aggregationPipeline = [
      // Match the student by user ID
      {
        $match: {
          student: objectId(userId),
        },
      },
      // Unwind the courses array
      {
        $unwind: {
          path: "$courses",
        },
      },
      // Lookup quizzes for each course
      {
        $lookup: {
          from: "quizzes",
          localField: "courses",
          foreignField: "course",
          as: "quizzes",
        },
      },
      // Unwind the quizzes array
      {
        $unwind: {
          path: "$quizzes",
        },
      },
      // Apply search filter on quiz title
      searchMatch,
      // Lookup course data
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "course",
        },
      },
      // Unwind course array
      {
        $unwind: {
          path: "$course",
        },
      },
      // Lookup category data with fallback for missing categories
      {
        $lookup: {
          from: "categories",
          localField: "course.category",
          foreignField: "_id",
          as: "course.category",
        },
      },
      // Handle missing categories
      {
        $addFields: {
          "course.category": {
            $cond: {
              if: { $eq: [{ $size: "$course.category" }, 0] },
              then: { name: "Unknown" },
              else: { $arrayElemAt: ["$course.category", 0] },
            },
          },
        },
      },
      // Lookup quiz submissions to check if student has submitted
      {
        $lookup: {
          from: "quizsubmissions",
          let: { quizId: "$quizzes._id", studentId: "$student" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$quiz", "$$quizId"] },
                    { $eq: ["$student", "$$studentId"] },
                  ],
                },
              },
            },
          ],
          as: "submissions",
        },
      },
      // Add fields to shape the output
      {
        $addFields: {
          quizId: "$quizzes._id",
          quizTitle: "$quizzes.title",
          quizSlug: "$quizzes.slug",
          totalQuestions: { $size: "$quizzes.questions" },
          courseId: "$course._id",
          courseSlug: "$course.slug",
          courseTitle: "$course.title",
          categoryName: "$course.category.name",
          hasSubmitted: { $gt: [{ $size: "$submissions" }, 0] },
        },
      },
      // Project to include only necessary fields
      {
        $project: {
          _id: "$quizId",
          title: "$quizTitle",
          slug: "$quizSlug",
          createdAt: 1,
          totalQuestions: 1,
          hasSubmitted: 1,
          course: {
            title: "$courseTitle",
            slug: "$courseSlug",
            _id: "$courseId",
            category: {
              name: "$categoryName",
            },
          },
        },
      },
      // Sort by quiz title
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

    // Get total count for pagination
    const [totalCount] = await Student.aggregate([
      {
        $match: {
          student: objectId(userId),
        },
      },
      {
        $unwind: {
          path: "$courses",
        },
      },
      {
        $lookup: {
          from: "quizzes",
          localField: "courses",
          foreignField: "course",
          as: "quizzes",
        },
      },
      {
        $unwind: {
          path: "$quizzes",
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
    const quizzes = await Student.aggregate(aggregationPipeline);

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
    console.error("Error fetching quizzes for student:", error.stack);
    throw new Error("Failed to fetch quizzes for student: " + error.message);
  }
}
// get quizzes with questions for students Dashboard ========================
export async function getQuizForCourseSlug(courseSlug) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Aggregation pipeline
    const aggregationPipeline = [
      // Match the student by user ID
      {
        $match: {
          student: objectId(userId),
        },
      },
      // Unwind the courses array
      {
        $unwind: {
          path: "$courses",
        },
      },
      // Lookup course data to filter by course slug
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "course",
        },
      },
      // Unwind course array
      {
        $unwind: {
          path: "$course",
        },
      },
      // Match the specific course by slug
      {
        $match: {
          "course.slug": courseSlug,
        },
      },
      // Lookup quizzes for the matched course
      {
        $lookup: {
          from: "quizzes",
          localField: "courses",
          foreignField: "course",
          as: "quizzes",
        },
      },
      // Unwind the quizzes array
      {
        $unwind: {
          path: "$quizzes",
        },
      },
      {
        $lookup: {
          from: "quizsubmissions",
          let: { quizId: "$quizzes._id", studentId: "$student" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$quiz", "$$quizId"] },
                    { $eq: ["$student", "$$studentId"] },
                  ],
                },
              },
            },
          ],
          as: "submissions",
        },
      },
      // Add fields to shape the output
      {
        $addFields: {
          quizId: "$quizzes._id",
          quizTitle: "$quizzes.title",
          quizSlug: "$quizzes.slug",
          questions: "$quizzes.questions",
          totalQuestions: { $size: "$quizzes.questions" },
          courseId: "$course._id",
          courseSlug: "$course.slug",
          courseTitle: "$course.title",
          hasSubmitted: { $gt: [{ $size: "$submissions" }, 0] },
          percentage: { $arrayElemAt: ["$submissions.percentage", 0] },
          score: { $arrayElemAt: ["$submissions.score", 0] },
        },
      },
      // Project to include necessary fields including questions
      {
        $project: {
          _id: "$quizId",
          title: "$quizTitle",
          slug: "$quizSlug",
          createdAt: "$quizzes.createdAt",
          questions: 1,
          totalQuestions: 1,
          hasSubmitted: 1,
          percentage: 1,
          score: 1,
          course: {
            title: "$courseTitle",
            slug: "$courseSlug",
            _id: "$courseId",
          },
        },
      },
      // Limit to one quiz
      {
        $limit: 1,
      },
    ];

    // Execute aggregation
    const quizzes = await Student.aggregate(aggregationPipeline);

    if (!quizzes || quizzes.length === 0) {
      throw new Error("No quiz found for the specified course slug");
    }

    return JSON.parse(
      JSON.stringify({
        quiz: quizzes[0],
      }),
    );
  } catch (error) {
    console.error("Error fetching quiz for course slug:", error.stack);
    throw new Error("Failed to fetch quiz for course slug: " + error.message);
  }
}

export async function saveQuizResult({ quizId, data, path }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Find the quiz and populate necessary data
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw new Error("Quiz not found");
    }

    // Calculate score and prepare answers array
    let correctAnswers = 0;
    const answers = await Promise.all(
      Object.entries(data.answers).map(async ([questionId, optionIds]) => {
        // Find the question in the quiz
        const question = quiz.questions.find(
          (q) => q._id.toString() === questionId,
        );
        if (!question) {
          throw new Error(`Question ${questionId} not found in quiz`);
        }

        // Get correct options for this question
        const correctOptionIds = question.options
          .filter((opt) => opt.isCorrect)
          .map((opt) => opt._id.toString());

        // Convert user selections to strings for comparison
        const selectedOptionIds = optionIds.map((id) => id.toString());

        // Check if all correct options are selected and no incorrect ones
        const isCorrect =
          correctOptionIds.length === selectedOptionIds.length &&
          correctOptionIds.every((id) => selectedOptionIds.includes(id));

        if (isCorrect) {
          correctAnswers++;
        }

        return {
          question: objectId(questionId),
          selectedOptions: optionIds.map((id) => objectId(id)),
          isCorrect,
        };
      }),
    );

    // Calculate percentage
    const totalQuestions = quiz.questions.length;
    const percentage =
      totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    // Create or update the quiz submission
    const submission = await QuizSubmission.findOneAndUpdate(
      {
        student: objectId(userId),
        quiz: objectId(quizId),
      },
      {
        $set: {
          answers,
          score: correctAnswers,
          percentage,
          submittedAt: new Date(),
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    revalidatePath(path);
    return {
      success: true,
      message: "Quiz submitted successfully",
      data: JSON.parse(
        JSON.stringify({
          totalQuestions,
          answers: submission.answers,
        }),
      ),
    };
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error(error.message || "Failed to save quiz result");
  }
}
