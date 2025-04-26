"use server";
import { auth } from "@clerk/nextjs/server";
import natural from "natural";

import { objectId } from "../utils";

import Category from "@/models/Category";
import Course from "@/models/Course";
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

export async function getTitleRecommendations(partialTitle) {
  try {
    // Get existing course titles for analysis
    const existingCourses = await Course.find({}, { title: 1 }).lean();

    // Common patterns for course titles
    const patterns = [
      { prefix: "Complete", suffix: "Guide", weight: 0.9 },
      { prefix: "Master", suffix: "Course", weight: 0.8 },
      { prefix: "Professional", suffix: "Training", weight: 0.7 },
      { prefix: "Advanced", suffix: "Masterclass", weight: 0.6 },
      { prefix: "Practical", suffix: "Workshop", weight: 0.5 },
    ];

    // Clean and tokenize input
    const inputTokens = tokenizer.tokenize(partialTitle.toLowerCase());
    const cleanInput = inputTokens
      .filter((token) => token.length > 2)
      .join(" ");

    // Generate variations based on patterns
    const suggestions = patterns.map((pattern) => {
      const title = `${pattern.prefix} ${cleanInput} ${pattern.suffix}`;
      const confidence = calculateTitleConfidence(
        title,
        existingCourses,
        pattern.weight,
      );
      return { title, confidence };
    });

    // Add specialized suggestions
    if (cleanInput.includes("begin") || cleanInput.includes("start")) {
      suggestions.push({
        title: `${cleanInput} for Beginners`,
        confidence: 0.95,
      });
    }

    if (cleanInput.includes("pro") || cleanInput.includes("advance")) {
      suggestions.push({
        title: `Advanced ${cleanInput} Professional Course`,
        confidence: 0.85,
      });
    }

    // Sort by confidence and return top 5
    return suggestions
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5)
      .map(({ title }) => ({
        value: title
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        label: "AI Suggestion",
      }));
  } catch (error) {
    console.error("Error generating title suggestions:", error);
    return [];
  }
}

function calculateTitleConfidence(title, existingCourses, patternWeight) {
  // Check similarity with existing courses
  const similarity = existingCourses.some((course) =>
    course.title.toLowerCase().includes(title.toLowerCase()),
  )
    ? 0.3
    : 1;

  // Check title length (ideal: 3-7 words)
  const words = title.split(" ").length;
  const lengthScore = words >= 3 && words <= 7 ? 1 : 0.7;

  // Calculate final confidence
  return (similarity * lengthScore * patternWeight).toFixed(2);
}

async function generateCourseFeatures(categoryName) {
  // Category-specific features
  const categoryFeatures = {
    Programming: [
      "Practical coding exercises and projects",
      "Industry-standard development tools",
      "Code reviews and best practices",
      "Real-world application examples",
    ],
    Design: [
      "Professional design tools and workflows",
      "Portfolio-ready projects",
      "Industry-standard design principles",
      "Practical design exercises",
    ],
    Business: [
      "Real-world case studies",
      "Industry expert insights",
      "Practical business strategies",
      "Market analysis techniques",
    ],
    // Add more categories as needed
  };

  // Get category features or use default ones
  const features = categoryFeatures[categoryName] || [
    "Comprehensive learning materials",
    "Practical exercises and projects",
    "Expert-led instruction",
    "Industry-relevant skills",
  ];

  // Add common features
  return [
    ...features,
    "Regular course updates",
    "24/7 support",
    "Certificate of completion",
    "Lifetime access to course materials",
  ];
}

export async function getDescriptionRecommendations({
  title,
  category,
  level,
}) {
  try {
    // Templates based on course level
    const levelTemplates = {
      Beginner: [
        "Perfect for beginners, this {category} course covers the fundamentals of {title}. Learn essential concepts and practical skills through hands-on exercises and real-world examples.",
        "Start your journey in {title} with this comprehensive beginner-friendly course. No prior {category} experience needed. Build a strong foundation through step-by-step tutorials.",
        "Designed for newcomers to {category}, this {title} course provides a structured learning path with basic concepts, practical examples, and beginner-friendly projects.",
      ],
      Intermediate: [
        "Take your {category} skills to the next level with this intermediate {title} course. Build upon your existing knowledge and tackle more complex projects and challenges.",
        "Enhance your {category} expertise through practical {title} applications. This course bridges the gap between basic concepts and advanced techniques.",
        "Ideal for those with basic {category} knowledge, this {title} course dives deeper into professional techniques and industry-standard practices.",
      ],
      Advanced: [
        "Master advanced {category} concepts in this comprehensive {title} course. Explore cutting-edge techniques and complex problem-solving strategies.",
        "Designed for experienced {category} professionals, this advanced {title} course covers sophisticated concepts and enterprise-level implementations.",
        "Push your {category} expertise to new heights with this advanced {title} course. Focus on optimization, best practices, and professional workflows.",
      ],
    };

    // Get templates for the specified level
    const templates = levelTemplates[level] || levelTemplates.Beginner;

    // Get the category from id
    const result = await Category.findById(category).lean();

    // Generate course features based on category
    const features = await generateCourseFeatures(result?.name);

    // Generate descriptions with features
    const descriptions = templates.map((template) => {
      const baseDescription = template
        .replace(/{category}/g, result?.name)
        .replace(/{title}/g, title);

      return {
        value: `${baseDescription}\n\nKey Features:\n${features.map((f) => `• ${f}`).join("\n")}`,
        label: "AI Suggestion",
        confidence: calculateDescriptionConfidence(baseDescription, features),
      };
    });

    return descriptions.sort((a, b) => b.confidence - a.confidence);
  } catch (error) {
    console.error("Error generating description suggestions:", error);
    return [];
  }
}

function calculateDescriptionConfidence(description, features) {
  const score = {
    length: description.length >= 100 && description.length <= 500 ? 1 : 0.7,
    features: features.length >= 4 ? 1 : 0.8,
    keywords:
      description.toLowerCase().includes("learn") ||
      description.toLowerCase().includes("master")
        ? 1
        : 0.9,
  };

  return ((score.length + score.features + score.keywords) / 3).toFixed(2);
}
