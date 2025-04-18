"use server";

import InstructorInfo from "@/models/InstructorInfo";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";
import { objectId } from "../utils";

// getInstructorInfo for admin
export async function getInstructorInfo({ page = 1, limit = 10 } = {}) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();
    const role = sessionClaims?.role;

    if (role !== "admin") {
      throw new Error("User not authorized to view this data");
    }
    const becomeInstructor = await InstructorInfo.find({
      status: { $ne: "approved" },
    })
      .sort({ createdAt: -1 })
      .populate("student", "firstName lastName email")
      .skip((page - 1) * limit)
      .limit(limit);

    const totalRequest = (await InstructorInfo.estimatedDocumentCount()) || 0;
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
    console.error("Error fetching quizzes:", error);
    throw new Error("Failed to fetch quizzes");
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
