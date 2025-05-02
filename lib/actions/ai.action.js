"use server";

import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
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

// Using Google Gemini AI for message generation
const { GEMINI_API_KEY } = process.env;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
export async function generateMessage({ message }) {
  try {
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;
    if (!userId) throw new Error("User not authenticated");
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: message,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating message:", error);
    return {
      error: "Failed to generate message",
    };
  }
}

export async function getTitleRecommendations(partialTitle) {
  try {
    // Get existing course titles
    const existingCourses = await Course.find({}, { title: 1 }).lean();

    // Create structured prompt for Gemini
    const exactPrompt = `
    Generate 10 professional course titles for: "${partialTitle}"
    
    Requirements:
    1. Use these patterns with their importance weights:
       - Complete X Guide (0.9)
       - Master X Course (0.8)
       - Professional X Training (0.7)
       - Advanced X Masterclass (0.6)
       - Practical X Workshop (0.5)
    
    2. Avoid these existing titles:
    ${existingCourses.map((c) => c.title).join(", ")}
    
    3. Special cases:
       - If topic seems beginner-focused, include a "for Beginners" variation
       - If topic seems advanced, include a "Professional" variation
    
    Return a JSON array with exactly 10 objects in this format:
    [
      {
        "value": "The Title With Proper Capitalization",
        "confidence": 0.XX,
        "label": "AI Suggestion"
      }
    ]
    
    Ensure each title is:
    - Unique and professional
    - 7-15 words long
    - Properly capitalized
    - Different from existing titles
    `;

    // Generate suggestions using Gemini AI
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: exactPrompt,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.8,
        maxOutputTokens: 1024,
      },
    });

    // Clean the response text before parsing
    const cleanResponse = response.text
      .replace(/```json\n?/, "") // Remove opening code block
      .replace(/\n?```/, "") // Remove closing code block
      .trim(); // Remove extra whitespace

    // Parse and validate the response
    try {
      const suggestions = JSON.parse(cleanResponse);

      // Validate and clean suggestions
      return suggestions
        .filter((s) => s.value && typeof s.confidence === "number")
        .map((s) => ({
          value: s.value
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
            )
            .join(" "),
          label: "AI Suggestion",
          confidence: parseFloat(s.confidence) || 0.5,
        }))
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 10);
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      return fallbackTitleGeneration(partialTitle, existingCourses);
    }
  } catch (error) {
    console.error("Error generating title suggestions:", error);
    return [];
  }
}

// Fallback function using original pattern-based logic
function fallbackTitleGeneration(partialTitle) {
  const patterns = [
    { prefix: "Complete", suffix: "Guide", weight: 0.9 },
    { prefix: "Master", suffix: "Course", weight: 0.8 },
    { prefix: "Professional", suffix: "Training", weight: 0.7 },
  ];

  const cleanInput = partialTitle.toLowerCase();
  return patterns
    .map((pattern) => ({
      value: `${pattern.prefix} ${cleanInput} ${pattern.suffix}`,
      label: "AI Suggestion",
      confidence: pattern.weight,
    }))
    .slice(0, 10);
}

export async function getDescriptionRecommendations({
  title,
  category,
  level,
}) {
  try {
    // Get the category from id
    const result = await Category.findById(category).lean();

    // Get course features
    const features = await generateCourseFeatures(result?.name);

    // Create structured prompt for Gemini
    const exactPrompt = `
    Generate 3 professional course descriptions for a ${level} level ${result?.name} course titled "${title}"

    Course Features:
    ${features.map((f) => `• ${f}`).join("\n")}

    Requirements:
    1. Each description should:
       - Be 100-500 words long
       - Include course features
       - Mention learning outcomes
       - Target the appropriate skill level
       - Use engaging language

    2. Consider the level:
       - Beginner: Focus on fundamentals, no prerequisites
       - Intermediate: Build on basic knowledge
       - Advanced: Complex concepts, professional applications

    Return a JSON array with exactly 3 objects in this format:
    [
      {
        "value": "The complete description with features list",
        "confidence": 0.XX (based on matching requirements),
        "label": "AI Suggestion"
      }
    ]
    `;

    // Generate descriptions using Gemini AI
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: exactPrompt,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.8,
        maxOutputTokens: 2048,
      },
    });

    // Clean and parse the response
    const cleanResponse = response.text
      .replace(/```json\n?/, "")
      .replace(/\n?```/, "")
      .trim();

    try {
      const descriptions = JSON.parse(cleanResponse);

      return descriptions
        .filter((d) => d.value && typeof d.confidence === "number")
        .map((d) => ({
          value: d.value,
          label: "AI Suggestion",
          confidence: parseFloat(d.confidence) || 0.5,
        }))
        .sort((a, b) => b.confidence - a.confidence);
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      // Fallback to template-based descriptions
      return generateTemplateDescriptions(title, result?.name, level, features);
    }
  } catch (error) {
    console.error("Error generating description suggestions:", error);
    return [];
  }
}

// Add this helper function for fallback descriptions
function generateTemplateDescriptions(title, category, level, features) {
  const templates = {
    Beginner: [
      `Perfect for beginners, this ${category} course covers the fundamentals of ${title}. Learn essential concepts and practical skills through hands-on exercises and real-world examples.`,
      `Start your journey in ${title} with this comprehensive beginner-friendly course. No prior ${category} experience needed.`,
    ],
    Intermediate: [
      `Take your ${category} skills to the next level with this intermediate ${title} course. Build upon your existing knowledge.`,
      `Enhance your ${category} expertise through practical ${title} applications.`,
    ],
    Advanced: [
      `Master advanced ${category} concepts in this comprehensive ${title} course. Explore cutting-edge techniques.`,
      `Push your ${category} expertise to new heights with this advanced ${title} course.`,
    ],
  };

  const baseTemplates = templates[level] || templates.Beginner;

  return baseTemplates.map((template) => ({
    value: `${template}\n\nKey Features:\n${features.map((f) => `• ${f}`).join("\n")}`,
    label: "AI Suggestion",
    confidence: 0.7,
  }));
}

export async function generateInstructorCoursesReport() {
  try {
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;
    if (!userId) throw new Error("User not authenticated");

    // Get all courses and their progress for the instructor
    const coursesProgress = await Course.aggregate([
      // Match courses by instructor
      { $match: { instructor: objectId(userId) } },

      // Lookup progress data
      {
        $lookup: {
          from: "progresses",
          localField: "_id",
          foreignField: "course",
          as: "studentProgress",
        },
      },

      // Lookup category data
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },

      // Format the data
      {
        $project: {
          title: 1,
          level: 1,
          category: { $arrayElemAt: ["$categoryInfo.name", 0] },
          totalStudents: { $size: "$studentProgress" },
          totalLessons: 1,
          averageCompletion: {
            $avg: {
              $map: {
                input: "$studentProgress",
                as: "progress",
                in: {
                  $multiply: [
                    {
                      $divide: [
                        { $size: "$$progress.lessons" },
                        { $max: ["$totalLessons", 1] },
                      ],
                    },
                    100,
                  ],
                },
              },
            },
          },
        },
      },
    ]);

    // Create simplified prompt for Gemini
    const exactPrompt = `
    Analyze this course data and provide a brief report. 
    Return ONLY a JSON object (no markdown, no code blocks) in this exact format:
    {
      "summary": "One line performance overview",
      "topCourses": ["course1", "course2"],
      "improvements": ["suggestion1", "suggestion2"],
      "growthTip": "One key recommendation"
    }

    Course Data:
    ${coursesProgress
      .map(
        (course) => `
    ${course.title} (${course.category}):
    - Students: ${course.totalStudents}
    - Completion: ${course.averageCompletion?.toFixed(1) || 0}%`,
      )
      .join("\n")}`;

    // Generate report using Gemini AI
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: exactPrompt,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        topK: 40,
        topP: 0.8,
      },
    });

    // Clean and parse response
    const cleanResponse = response.text
      .replace(/^```json\s*/, "")
      .replace(/\s*```$/, "")
      // eslint-disable-next-line quotes
      .replace(/[\u201C\u201D]/g, '"') // Replace smart quotes
      .trim();
    try {
      const aiReport = JSON.parse(cleanResponse);
      const stats = calculateStats(coursesProgress);

      return {
        summary: `Managing ${stats.totalCourses} courses with ${stats.totalStudents} students (${stats.averageCompletion}% avg. completion)`,
        topCourses: aiReport.topCourses || [],
        improvements: aiReport.improvements || [],
        growthTip:
          aiReport.growthTip ||
          "Consider expanding successful course categories",
      };
    } catch (parseError) {
      console.error(
        "Error parsing AI response:",
        parseError,
        "\nRaw response:",
        cleanResponse,
      );
      return generateFallbackReport(coursesProgress);
    }
  } catch (error) {
    console.error("Error:", error);
    return { error: "Failed to generate report" };
  }
}

// Helper function to calculate stats
function calculateStats(coursesProgress) {
  return {
    totalCourses: coursesProgress.length,
    totalStudents: coursesProgress.reduce((sum, c) => sum + c.totalStudents, 0),
    averageCompletion: parseFloat(
      (
        coursesProgress.reduce(
          (sum, c) => sum + (c.averageCompletion || 0),
          0,
        ) / Math.max(coursesProgress.length, 1)
      ).toFixed(1),
    ),
  };
}

// Fallback report generator
function generateFallbackReport(coursesProgress) {
  const stats = calculateStats(coursesProgress);
  const sortedCourses = [...coursesProgress].sort(
    (a, b) => (b.averageCompletion || 0) - (a.averageCompletion || 0),
  );

  return {
    summary: `Managing ${stats.totalCourses} courses with ${stats.totalStudents} students`,
    topCourses: sortedCourses.slice(0, 2).map((c) => c.title),
    improvements: ["Update course content", "Increase student engagement"],
    growthTip: "Focus on high-performing categories",
  };
}

export async function getAssignmentDescriptionRecommendations({
  desc,
  title,
  category,
  level,
}) {
  try {
    // Get the category name
    const result = await Category.findById(category).lean();

    // Create structured prompt for Gemini
    const exactPrompt = `
    Generate 3 detailed professional assignment descriptions for a ${level} level ${result?.name} course titled "${title}"
    
    Original Description (if provided):
    ${desc || "No description provided"}

    Requirements:
    1. Each assignment description must include:
       - Clear learning objectives aligned with course level
       - Step-by-step implementation guidelines
       - Required tools and technologies
       - Estimated completion time
       - Grading criteria
       - Project milestones
       - Code examples or pseudocode (if applicable)
       - References and resources

    2. Level-specific considerations for ${level} level:
       Beginner:
       - Detailed step-by-step instructions
       - Basic concept explanations
       - Example snippets
       - Clear prerequisites
       - Guided approach

       Intermediate:
       - Moderate complexity tasks
       - Some creative freedom
       - Industry best practices
       - Error handling requirements
       - Code optimization goals

       Advanced:
       - Complex real-world scenarios
       - System design considerations
       - Performance requirements
       - Scalability aspects
       - Industry standard compliance

    3. Deliverables should specify:
       - Required documentation
       - Code quality standards
       - Testing requirements
       - Presentation format
       - Deployment instructions (if applicable)
       - Collaboration guidelines
       - Review criteria

    Return a detailed JSON array with exactly 3 objects in this format:
    [
      {
        "value": "Complete assignment description with all details",
        "requirements": [
          "Detailed requirement 1 with acceptance criteria",
          "Detailed requirement 2 with technical specifications",
          "Detailed requirement 3 with quality standards"
        ],
        "deliverables": [
          "Specific deliverable 1 with format and submission guidelines",
          "Specific deliverable 2 with quality checks",
          "Specific deliverable 3 with validation criteria"
        ],
        "objectives": [
          "Clear learning objective 1",
          "Clear learning objective 2"
        ],
        "resources": [
          "Recommended resource 1",
          "Recommended resource 2"
        ],
        "timeline": "Estimated completion time and milestones",
        "gradingCriteria": [
          "Grading criterion 1 with weightage",
          "Grading criterion 2 with weightage"
        ],
        "confidence": 0.XX,
        "label": "AI Suggestion"
      }
    ]`;

    // Generate detailed descriptions using Gemini AI
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: exactPrompt,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.8,
        maxOutputTokens: 4096, // Increased for longer responses
      },
    });

    // Clean and parse the response
    const cleanResponse = response.text
      .replace(/```json\n?/, "")
      .replace(/\n?```/, "")
      .trim();

    try {
      const suggestions = JSON.parse(cleanResponse);

      // Validate and enhance suggestions
      return suggestions
        .filter(
          (s) =>
            s.value &&
            Array.isArray(s.requirements) &&
            Array.isArray(s.deliverables) &&
            Array.isArray(s.objectives) &&
            Array.isArray(s.resources) &&
            Array.isArray(s.gradingCriteria),
        )
        .map((s) => ({
          value: s.value,
          requirements: s.requirements,
          deliverables: s.deliverables,
          objectives: s.objectives,
          resources: s.resources,
          timeline: s.timeline,
          gradingCriteria: s.gradingCriteria,
          label: "AI Suggestion",
          confidence: parseFloat(s.confidence) || 0.5,
        }))
        .sort((a, b) => b.confidence - a.confidence);
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      return generateDetailedFallbackAssignments(title, level, result?.name);
    }
  } catch (error) {
    console.error("Error generating assignment suggestions:", error);
    return [];
  }
}

// Enhanced fallback assignment generator
function generateDetailedFallbackAssignments(title, level, category) {
  const templates = {
    Beginner: {
      desc: `Create a foundational ${title} project that demonstrates your understanding of basic ${category} concepts. This step-by-step guided assignment will help you build a solid foundation in ${title}.`,
      reqs: [
        "Follow the provided project structure and coding guidelines",
        "Implement core features with detailed comments",
        "Create comprehensive documentation following the template",
        "Add error handling for basic scenarios",
        "Include unit tests for main functions",
      ],
      delivs: [
        "Well-documented source code following style guide",
        "README.md with setup and running instructions",
        "Project demonstration video (5-10 minutes)",
        "Test cases and results documentation",
        "Self-assessment report",
      ],
      objectives: [
        "Understand fundamental concepts of ${title}",
        "Practice basic implementation techniques",
        "Learn proper documentation practices",
        "Gain experience with basic testing",
      ],
      resources: [
        "Course materials and lecture notes",
        "Official documentation",
        "Recommended beginner tutorials",
        "Sample code repository",
      ],
      timeline: "2 weeks (10-15 hours per week)",
      grading: [
        "Code quality and organization (30%)",
        "Documentation completeness (25%)",
        "Feature implementation (25%)",
        "Testing coverage (20%)",
      ],
    },
    Intermediate: {
      desc: `Create a foundational ${title} project that demonstrates your understanding of Intermediate ${category} concepts. This step-by-step guided assignment will help you build a solid foundation in ${title}.`,
      reqs: [
        "Follow the provided project structure and coding guidelines",
        "Implement core features with detailed comments",
        "Create comprehensive documentation following the template",
        "Add error handling for basic scenarios",
        "Include unit tests for main functions",
      ],
      delivs: [
        "Well-documented source code following style guide",
        "README.md with setup and running instructions",
        "Project demonstration video (5-10 minutes)",
        "Test cases and results documentation",
        "Self-assessment report",
      ],
      objectives: [
        "Understand fundamental concepts of ${title}",
        "Practice basic implementation techniques",
        "Learn proper documentation practices",
        "Gain experience with basic testing",
      ],
      resources: [
        "Course materials and lecture notes",
        "Official documentation",
        "Recommended beginner tutorials",
        "Sample code repository",
      ],
      timeline: "2 weeks (10-15 hours per week)",
      grading: [
        "Code quality and organization (30%)",
        "Documentation completeness (25%)",
        "Feature implementation (25%)",
        "Testing coverage (20%)",
      ],
    },
    Advanced: {
      desc: `Create a foundational ${title} project that demonstrates your understanding of Advanced ${category} concepts. This step-by-step guided assignment will help you build a solid foundation in ${title}.`,
      reqs: [
        "Follow the provided project structure and coding guidelines",
        "Implement core features with detailed comments",
        "Create comprehensive documentation following the template",
        "Add error handling for basic scenarios",
        "Include unit tests for main functions",
      ],
      delivs: [
        "Well-documented source code following style guide",
        "README.md with setup and running instructions",
        "Project demonstration video (5-10 minutes)",
        "Test cases and results documentation",
        "Self-assessment report",
      ],
      objectives: [
        "Understand fundamental concepts of ${title}",
        "Practice basic implementation techniques",
        "Learn proper documentation practices",
        "Gain experience with basic testing",
      ],
      resources: [
        "Course materials and lecture notes",
        "Official documentation",
        "Recommended beginner tutorials",
        "Sample code repository",
      ],
      timeline: "2 weeks (10-15 hours per week)",
      grading: [
        "Code quality and organization (30%)",
        "Documentation completeness (25%)",
        "Feature implementation (25%)",
        "Testing coverage (20%)",
      ],
    },
  };

  const template = templates[level] || templates.Beginner;

  return [
    {
      value: template.desc,
      requirements: template.reqs,
      deliverables: template.delivs,
      objectives: template.objectives,
      resources: template.resources,
      timeline: template.timeline,
      gradingCriteria: template.grading,
      label: "AI Suggestion",
      confidence: 0.7,
    },
  ];
}
