"use server";
import { auth } from "@clerk/nextjs/server";
import natural from "natural";

import { objectId } from "../utils";

import Progress from "@/models/Progress";

const tokenizer = new natural.WordTokenizer();

export async function generateRecommendations(courseHistory) {
  try {
    // Convert course titles and categories into tokens
    const tokens = courseHistory.flatMap((course) =>
      tokenizer.tokenize((course.title + " " + course.category).toLowerCase()),
    );

    // Create a basic frequency analysis
    const frequency = tokens.reduce((acc, token) => {
      acc[token] = (acc[token] || 0) + 1;
      return acc;
    }, {});

    // Simple recommendation logic based on frequency
    const recommendations = Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([topic]) => ({
        topic,
        confidence: Math.random().toFixed(2),
        suggestion: `Consider exploring more courses related to ${topic}`,
      }));

    return recommendations;
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return [];
  }
}

export async function getPersonalizedRecommendations() {
  try {
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;
    if (!userId) throw new Error("User not authenticated");

    const courseHistory = await Progress.aggregate([
      {
        $match: { student: objectId(userId) },
      },
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      {
        $unwind: "$courseDetails",
      },
      {
        $lookup: {
          from: "categories",
          localField: "courseDetails.category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $project: {
          _id: 1,
          title: "$courseDetails.title",
          category: "$categoryDetails.name", // Now using the category name
          totalLessons: "$courseDetails.totalLessons",
          completedLessons: { $size: "$lessons" },
          progress: {
            $divide: [
              { $size: "$lessons" },
              {
                $cond: [
                  { $gt: ["$courseDetails.totalLessons", 0] },
                  "$courseDetails.totalLessons",
                  1,
                ],
              },
            ],
          },
        },
      },
      {
        $sort: { progress: -1 },
      },
    ]);

    const formattedHistory = courseHistory.map((item) => ({
      title: item.title || "",
      category: item.category || "Uncategorized",
      progress: item.progress || 0,
    }));

    return await generateRecommendations(formattedHistory);
  } catch (error) {
    console.error("Error in recommendations:", error);
    return [];
  }
}

export async function generateLearningPath() {
  try {
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;
    if (!userId) throw new Error("User not authenticated");

    const userProgress = await Progress.aggregate([
      {
        $match: { student: objectId(userId) },
      },
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      {
        $unwind: "$courseDetails",
      },
      {
        $lookup: {
          from: "categories",
          localField: "courseDetails.category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $group: {
          _id: "$courseDetails.category",
          categoryName: { $first: "$categoryDetails.name" },
          completedCourses: {
            $push: {
              title: "$courseDetails.title",
              progress: {
                $divide: [
                  { $size: "$lessons" },
                  { $max: ["$courseDetails.totalLessons", 1] },
                ],
              },
            },
          },
          averageProgress: { $avg: "$progress" },
        },
      },
    ]);

    const learningPath = userProgress.map((category) => ({
      category: category.categoryName || "Uncategorized", // Use categoryName instead of _id
      mastered: category.completedCourses
        .filter((course) => course.progress > 0.7)
        .map((course) => course.title),
      inProgress: category.completedCourses
        .filter((course) => course.progress <= 0.7 && course.progress > 0)
        .map((course) => course.title),
      recommendedNext: generateNextSteps(
        category.completedCourses.filter((c) => c.progress > 0.7),
        category.completedCourses.filter(
          (c) => c.progress <= 0.7 && c.progress > 0,
        ),
      ),
      confidence: calculateConfidence(category.averageProgress),
    }));

    return JSON.parse(JSON.stringify(learningPath));
  } catch (error) {
    console.error("Error generating learning path:", error);
    return [];
  }
}

// Helper function to generate next steps
function generateNextSteps(completed, inProgress) {
  const totalCourses = completed.length + inProgress.length;

  if (totalCourses === 0) {
    return ["Start with fundamental courses in this category"];
  }

  if (inProgress.length > 0) {
    return ["Complete your in-progress courses before starting new ones"];
  }

  return ["Advanced courses based on your completed topics"];
}

// Helper function to calculate confidence score
function calculateConfidence(progress) {
  return Math.min(Math.round((progress || 0) * 100), 100);
}
