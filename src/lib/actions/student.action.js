"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import dbConnect from "../dbConnect";

import Student from "@/models/Student";
import User from "@/models/User";

export async function updateStudent({ clerkUserId, user, path }) {
  try {
    await dbConnect();
    await User.findOneAndUpdate({ clerkUserId }, user, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

export async function getStudents({ page = 1, limit = 10, search = "" } = {}) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();
    const role = sessionClaims?.role;

    if (role !== "admin") {
      throw new Error("Don't have permission to perform this action!");
    }

    const skip = (page - 1) * limit;

    // Create match stage for search
    const matchStage = search
      ? {
          $match: {
            $or: [
              { "student.firstName": { $regex: search, $options: "i" } },
              { "student.lastName": { $regex: search, $options: "i" } },
            ],
          },
        }
      : { $match: {} };

    const students = await Student.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "student",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $unwind: {
          path: "$student",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Apply search filter after lookup to access student fields
      matchStage,
      // Project the required fields and calculate stats
      {
        $project: {
          studentId: "$studentId",
          firstName: "$student.firstName",
          lastName: "$student.lastName",
          email: "$student.email",
          slug: "$student.slug",
          createdAt: "$createdAt",
          courseCount: { $size: { $ifNull: ["$courses", []] } },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    // Get total count of students matching the search
    const totalStudents = search
      ? await Student.aggregate([
          {
            $lookup: {
              from: "users",
              localField: "student",
              foreignField: "_id",
              as: "student",
            },
          },
          {
            $unwind: {
              path: "$student",
              preserveNullAndEmptyArrays: true,
            },
          },
          matchStage,
          { $count: "total" },
        ]).then((result) => result[0]?.total || 0)
      : await Student.estimatedDocumentCount();

    const totalPages = Math.ceil(totalStudents / limit);

    return JSON.parse(
      JSON.stringify({
        students,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalStudents,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      }),
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    throw new Error("Failed to fetch students");
  }
}
