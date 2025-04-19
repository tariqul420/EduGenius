"use server";

import Certificate from "@/models/Certificate";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "../dbConnect";
import { objectId } from "../utils";

export async function getCertificateByStudent({
  page = 1,
  limit = 10,
  search = "",
} = {}) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();
    const role = sessionClaims?.role;
    const studentId = sessionClaims?.userId;

    if (role !== "student") {
      throw new Error("Don't have permission to perform this action!");
    }

    const skip = (page - 1) * limit;

    // Create search match stage
    const searchMatch = search
      ? {
          $match: {
            "course.title": { $regex: search, $options: "i" },
          },
        }
      : { $match: {} };

    const aggregationPipeline = [
      // Match certificates by student
      {
        $match: {
          student: objectId(studentId),
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
      // Lookup instructor data for course
      {
        $lookup: {
          from: "users",
          localField: "course.instructor",
          foreignField: "_id",
          as: "course.instructor",
        },
      },
      // Unwind instructor array
      {
        $unwind: "$course.instructor",
      },
      // Lookup student data
      {
        $lookup: {
          from: "users",
          localField: "student",
          foreignField: "_id",
          as: "student",
        },
      },
      // Unwind student array
      {
        $unwind: "$student",
      },
      // Apply search filter on course title
      searchMatch,
      // Project final shape
      {
        $project: {
          _id: 1,
          student: {
            firstName: "$student.firstName",
            lastName: "$student.lastName",
          },
          course: {
            title: "$course.title",
            instructor: {
              firstName: "$course.instructor.firstName",
              lastName: "$course.instructor.lastName",
            },
          },
          createdAt: 1,
        },
      },
      // Sort by createdAt
      {
        $sort: { createdAt: -1 },
      },
      // Skip for pagination
      {
        $skip: skip,
      },
      // Limit results
      {
        $limit: limit,
      },
    ];

    // Execute main aggregation
    const certificates = await Certificate.aggregate(aggregationPipeline);

    // Get total count using the same match and search conditions
    const [totalCount] = await Certificate.aggregate([
      {
        $match: {
          student: objectId(studentId),
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: "$course",
      },
      searchMatch,
      {
        $count: "total",
      },
    ]);

    const totalCertificates = totalCount?.total || 0;
    const totalPages = Math.ceil(totalCertificates / limit);

    return JSON.parse(
      JSON.stringify({
        certificates,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCertificates,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      }),
    );
  } catch (error) {
    console.error("Error fetching certificates:", error);
    throw new Error("Failed to fetch certificates");
  }
}
