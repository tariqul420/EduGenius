"use server";

import Instructor from "@/models/Instructor";
import User from "@/models/User";
import dbConnect from "../dbConnect";
import { objectId } from "../utils";

export async function getInstructors({ role, page = 1, limit = 5 }) {
  try {
    await dbConnect();
    const users = await User.find({ role }).limit(limit * page);
    const total = await User.countDocuments({ role });
    const hasNextPage = total > limit * page;

    return {
      users: JSON.parse(JSON.stringify(users)),
      total,
      hasNextPage,
    };
  } catch (error) {
    console.error("Error getting instructors:", error);
  }
}

export async function getInstructorBySlug(slug) {
  try {
    await dbConnect();
    return JSON.parse(JSON.stringify(await User.findOne({ slug })));
  } catch (error) {
    console.error("Error getting instructor by slug:", error);
  }
}

export async function getStudents({ instructorId, page = 1, limit = 10 }) {
  try {
    await dbConnect();

    // Get total count of students before pagination
    const totalCount = await Instructor.aggregate([
      {
        $match: {
          instructorId: objectId(instructorId),
        },
      },
      {
        $project: {
          studentCount: { $size: "$students" },
        },
      },
    ]);

    const total = totalCount[0]?.studentCount || 0;

    const students = await Instructor.aggregate([
      // Match the instructor
      {
        $match: {
          instructorId: objectId(instructorId),
        },
      },
      // Unwind the students array
      {
        $unwind: "$students",
      },
      // Lookup students collection
      {
        $lookup: {
          from: "students",
          localField: "students",
          foreignField: "student",
          as: "studentData",
        },
      },
      // Unwind the studentData array
      {
        $unwind: "$studentData",
      },
      // Lookup users collection
      {
        $lookup: {
          from: "users",
          localField: "studentData.student",
          foreignField: "_id",
          as: "userData",
        },
      },
      // Unwind the userData array
      {
        $unwind: "$userData",
      },
      // Filter courses to only include those from this instructor
      {
        $addFields: {
          filteredCourses: {
            $filter: {
              input: "$studentData.courses",
              as: "course",
              cond: {
                $in: ["$$course", "$courses"],
              },
            },
          },
        },
      },
      // Project the final shape with course count and default values
      {
        $project: {
          _id: 0,
          studentId: "$studentData.student",
          name: {
            $concat: [
              { $ifNull: ["$userData.firstName", ""] },
              " ",
              { $ifNull: ["$userData.lastName", ""] },
            ],
          },
          profilePicture: { $ifNull: ["$userData.profilePicture", ""] },
          email: "$userData.email",
          phone: { $ifNull: ["$userData.phone", ""] },
          address: { $ifNull: ["$userData.address", ""] },
          enrolledCourses: { $size: "$filteredCourses" },
        },
      },
      // Add pagination
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ]);

    // Calculate if there's a next page
    const hasNextPage = total > page * limit;

    return {
      students: JSON.parse(JSON.stringify(students)),
      pagination: {
        total,
        page,
        limit,
        hasNextPage,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error getting students by instructor courses ID:", error);
    throw error;
  }
}
