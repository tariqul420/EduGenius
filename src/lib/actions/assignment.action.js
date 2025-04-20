"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import dbConnect from "../dbConnect";
import { objectId } from "../utils";

import Assignment from "@/models/Assignment";

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
