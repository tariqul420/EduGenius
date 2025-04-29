"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import dbConnect from "../dbConnect";
import { objectId } from "../utils";

import Assignment from "@/models/Assignment";
import AssignmentSubmission from "@/models/AssignmentSubmission";
import Student from "@/models/Student";

export async function createAssignment({ courseId, data, path }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    await Assignment.create({
      ...data,
      instructor: userId,
      course: courseId,
    });

    revalidatePath(path);

    return { success: true, message: "Assignment created successfully." };
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw new Error("Failed to create assignment.");
  }
}

export async function updateAssignment({ assignmentId, data, path }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const assignment = await Assignment.findById(assignmentId);
    if (String(assignment.instructor) !== String(userId)) {
      throw new Error("You are not authorized to update this assignment.");
    }

    await Assignment.findByIdAndUpdate(assignmentId, data, { new: true });

    revalidatePath(path);

    return { success: true, message: "Assignment updated successfully." };
  } catch (error) {
    console.error("Error updating assignment:", error);
    throw new Error("Failed to update assignment.");
  }
}

export async function getAssignmentById(courseId) {
  try {
    await dbConnect();
    const assignment = await Assignment.findOne({ course: courseId });

    if (!assignment) {
      return null;
    }

    return JSON.parse(JSON.stringify(assignment));
  } catch (error) {
    console.error("Error fetching assignment:", error);
    throw new Error("Failed to fetch assignment.");
  }
}

// get assignment by instructor

export async function getAssignment({
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

    // Create search match stage
    const searchMatch = search
      ? {
          $match: {
            title: { $regex: search, $options: "i" },
          },
        }
      : { $match: {} };

    const aggregationPipeline = [
      // Match assignments by instructor
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
          totalMarks: 1,
          deadline: 1,
          "course.title": 1,
          "course.category.name": 1,
          studentsCount: { $size: { $ifNull: ["$course.students", []] } },
          submissionsCount: { $size: { $ifNull: ["$submissions", []] } },
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
    const [totalCount] = await Assignment.aggregate([
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

    const totalAssignments = totalCount?.total || 0;
    const totalPages = Math.ceil(totalAssignments / limit);

    // Execute main aggregation
    const assignments = await Assignment.aggregate(aggregationPipeline);

    return JSON.parse(
      JSON.stringify({
        assignments,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalAssignments,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      }),
    );
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw new Error("Failed to fetch assignments");
  }
}

export async function getAssignmentsForStudent({
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

    // Create search match stage for assignment title
    const searchMatch = search
      ? {
          $match: {
            "assignment.title": { $regex: search, $options: "i" },
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
      // Unwind the courses array (skip empty arrays if desired)
      {
        $unwind: {
          path: "$courses",
        },
      },
      // Lookup assignment for each course
      {
        $lookup: {
          from: "assignments",
          localField: "courses",
          foreignField: "course",
          as: "assignments",
        },
      },
      // Unwind the assignment array
      {
        $unwind: {
          path: "$assignments",
        },
      },
      // Apply search filter on assignment title
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
      {
        $lookup: {
          from: "assignmentsubmissions",
          let: { assignmentId: "$assignments._id", studentId: "$student" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$assignment", "$$assignmentId"] },
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
          assignmentId: "$assignments._id",
          assignmentTitle: "$assignments.title",
          assignmentDeadline: "$assignments.deadline",
          totalMarks: "$assignments.totalMarks",
          passMarks: "$assignments.passMarks",
          courseId: "$course._id",
          courseSlug: "$course.slug",
          courseTitle: "$course.title",
          categoryName: "$course.category.name",
          hasSubmitted: { $gt: [{ $size: "$submissions" }, 0] },
          mark: { $arrayElemAt: ["$submissions.mark", 0] },
        },
      },
      // Project to include only necessary fields
      {
        $project: {
          _id: "$assignmentId",
          title: "$assignmentTitle",
          deadline: "$assignmentDeadline",
          totalMarks: "$totalMarks",
          passMarks: "$passMarks",
          hasSubmitted: 1,
          mark: 1,
          course: {
            title: "$courseTitle",
            slug: "$courseSlug",
            _id: "$courseId",
            category: {
              name: "$categoryName",
            },
          },
          createdAt: "$assignments.createdAt",
        },
      },
      // Sort by assignment title
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
          from: "assignments",
          localField: "courses",
          foreignField: "course",
          as: "assignments",
        },
      },
      {
        $unwind: {
          path: "$assignments",
        },
      },
      searchMatch,
      {
        $count: "total",
      },
    ]);

    const totalAssignments = totalCount?.total || 0;
    const totalPages = Math.ceil(totalAssignments / limit);

    // Execute main aggregation
    const assignments = await Student.aggregate(aggregationPipeline);

    return JSON.parse(
      JSON.stringify({
        assignments,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalAssignments,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      }),
    );
  } catch (error) {
    console.error("Error fetching assignment for student:", error.stack);
    throw new Error("Failed to fetch assignment for student: " + error.message);
  }
}

// get assignment details for student dashboard
export async function getAssignmentForCourseSlug(courseSlug) {
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
      {
        $lookup: {
          from: "users",
          localField: "course.instructor",
          foreignField: "_id",
          as: "course.instructor",
        },
      },
      // Handle missing instructors
      {
        $addFields: {
          "course.instructor": {
            $cond: {
              if: { $eq: [{ $size: "$course.instructor" }, 0] },
              then: { name: "Unknown" },
              else: { $arrayElemAt: ["$course.instructor", 0] },
            },
          },
        },
      },
      // Lookup assignment for the matched course
      {
        $lookup: {
          from: "assignments",
          localField: "courses",
          foreignField: "course",
          as: "assignments",
        },
      },
      // Unwind the assignment array
      {
        $unwind: {
          path: "$assignments",
        },
      },
      {
        $lookup: {
          from: "assignmentsubmissions",
          let: { assignmentId: "$assignments._id", studentId: "$student" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$assignment", "$$assignmentId"] },
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
          assignmentId: "$assignments._id",
          assignmentTitle: "$assignments.title",
          assignmentDeadline: "$assignments.deadline",
          totalMarks: "$assignments.totalMarks",
          passMarks: "$assignments.passMarks",
          description: "$assignments.description",
          courseId: "$course._id",
          courseSlug: "$course.slug",
          courseTitle: "$course.title",
          categoryName: "$course.category.name",
          hasSubmitted: { $gt: [{ $size: "$submissions" }, 0] },
          mark: { $arrayElemAt: ["$submissions.mark", 0] },
          content: { $arrayElemAt: ["$submissions.content", 0] },
          feedback: { $arrayElemAt: ["$submissions.feedback", 0] },
          firstName: "$course.instructor.firstName",
          lastName: "$course.instructor.lastName",
        },
      },
      // Project to include necessary fields including questions
      {
        $project: {
          _id: "$assignmentId",
          title: "$assignmentTitle",
          deadline: "$assignmentDeadline",
          totalMarks: 1,
          passMarks: 1,
          hasSubmitted: 1,
          mark: 1,
          content: 1,
          feedback: 1,
          description: 1,
          course: {
            title: "$courseTitle",
            slug: "$courseSlug",
          },
          instructor: {
            firstName: "$firstName",
            lastName: "$lastName",
          },
          createdAt: 1,
        },
      },
      // Limit to one assignment
      {
        $limit: 1,
      },
    ];

    // Execute aggregation
    const assignment = await Student.aggregate(aggregationPipeline);

    if (!assignment || assignment.length === 0) {
      throw new Error("No assignment found for the specified course slug");
    }

    return JSON.parse(JSON.stringify(assignment[0]));
  } catch (error) {
    console.error("Error fetching assignment for course slug:", error.stack);
    throw new Error(
      "Failed to fetch assignment for course slug: " + error.message,
    );
  }
}

export async function studentSubmitAssignment({ data, path }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Check if the student has already submitted this assignment
    const existingSubmission = await AssignmentSubmission.findOne({
      student: userId,
      assignment: objectId(data.assignment),
    });

    if (existingSubmission) {
      return {
        success: false,
        message: "You have already submitted this assignment.",
      };
    }

    await AssignmentSubmission.create({
      ...data,
      student: userId,
    });

    revalidatePath(path);

    return { success: true, message: "Assignment created successfully." };
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw new Error("Failed to create assignment.");
  }
}
