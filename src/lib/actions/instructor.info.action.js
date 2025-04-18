"use server";

import InstructorInfo from "@/models/InstructorInfo";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";
import { objectId } from "../utils";

// getInstructorInfo for admin
export async function getInstructorInfo({
  page = 1,
  limit = 10,
  search = "",
} = {}) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();
    const role = sessionClaims?.role;

    if (role !== "admin") {
      throw new Error("User not authorized to view this data");
    }

    const skip = (page - 1) * limit;

    // Create search match stage
    const searchMatch = search
      ? {
          $match: {
            $or: [
              { "student.firstName": { $regex: search, $options: "i" } },
              { "student.lastName": { $regex: search, $options: "i" } },
            ],
          },
        }
      : { $match: {} };

    const becomeInstructor = await InstructorInfo.aggregate([
      // Match documents with status not equal to "approved"
      {
        $match: {
          status: { $ne: "approved" },
        },
      },
      // Lookup student data from users collection
      {
        $lookup: {
          from: "users",
          localField: "student",
          foreignField: "_id",
          as: "student",
        },
      },
      // Unwind student array to get a single student object
      {
        $unwind: {
          path: "$student",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Apply search filter on student names
      searchMatch,
      // Project only the required fields
      {
        $project: {
          student: {
            firstName: "$student.firstName",
            lastName: "$student.lastName",
            email: "$student.email",
          },
          status: 1,
          createdAt: 1,
          // Include other InstructorInfo fields as needed
        },
      },
      // Sort by createdAt in descending order
      {
        $sort: { createdAt: -1 },
      },
      // Apply pagination
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    // Get total count using the same conditions
    const totalRequest = await InstructorInfo.aggregate([
      // Match documents with status not equal to "approved"
      {
        $match: {
          status: { $ne: "approved" },
        },
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
        $unwind: {
          path: "$student",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Apply search filter
      searchMatch,
      // Count the matching documents
      {
        $count: "total",
      },
    ]).then((result) => result[0]?.total || 0);

    const totalPages = Math.ceil(totalRequest / limit);

    return JSON.parse(
      JSON.stringify({
        becomeInstructor,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalRequest,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      }),
    );
  } catch (error) {
    console.error("Error fetching instructor info:", error);
    throw new Error("Failed to fetch instructor info");
  }
}

// getInstructorInfo for Instructor ==============
export async function getInstructorInfoUser() {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const instructorInfo = await InstructorInfo.findOne({
      student: objectId(userId),
    });

    if (!instructorInfo) {
      return null;
    }

    return JSON.parse(JSON.stringify(instructorInfo));
  } catch (error) {
    console.error("Error getting instructor info:", error);
    throw error;
  }
}

// saveInstructorInfo
export async function saveInstructorInfo({ data, path }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Check if instructor info already exists
    const existingInfo = await InstructorInfo.findOne({
      student: objectId(userId),
    });

    // If instructor already exists, return existing info with status
    if (existingInfo) {
      return {
        success: false,
        message: "Instructor profile already exists",
        status: existingInfo.status,
        exists: true,
      };
    }

    // Create new instructor info
    await InstructorInfo.create({
      student: userId,
      phone: data.phone,
      expertise: data.expertise,
      profession: data.profession,
      education: data.education,
      address: {
        city: data.address.city,
        country: data.address.country,
      },
      experience: data.experience,
      motivation: data.motivation,
      teachingStyle: data.teachingStyle,
      status: "pending",
    });

    revalidatePath(path);
    return {
      success: true,
      message: "Instructor profile created successfully",
      exists: false,
    };
  } catch (error) {
    console.error("Error saving instructor info:", error);
    throw error;
  }
}

export async function updateStudentStatus({ studentId, status }) {
  try {
    // Connect to the database
    await dbConnect();

    const { sessionClaims } = await auth();
    const role = sessionClaims?.role;

    if (role !== "admin") {
      throw new Error("Action not permitted!");
    }

    // Update InstructorInfo document
    const updatedDoc = await InstructorInfo.findOneAndUpdate(
      { student: objectId(studentId) },
      { status },
      { new: true, runValidators: true },
    );

    // Check if a document was found and updated
    if (!updatedDoc) {
      throw new Error(`No InstructorInfo found for studentId: ${studentId}`);
    }

    // Revalidate the Next.js cache
    revalidatePath("/admin/become-instructor");

    return { success: true };
  } catch (error) {
    console.error("Error updating instructor status:", error.message);
    throw new Error(`Failed to update status: ${error.message}`);
  }
}
