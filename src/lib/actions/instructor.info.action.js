"use server";

import InstructorInfo from "@/models/InstructorInfo";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";
import { objectId } from "../utils";
// getInstructorInfo ==========================
export async function getInstructorInfo({ page = 1, limit = 10 } = {}) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();
    const role = sessionClaims?.role;

    if (role !== "admin") {
      throw new Error("User not authorized to view this data");
    }
    const becomeInstructor = await InstructorInfo.find({})
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
// saveInstructorInfo ==========================
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
    await dbConnect();

    await InstructorInfo.findOneAndUpdate(
      { student: objectId(studentId) },
      { status },
    );

    revalidatePath("/admin/become-instructor");
    return { success: true };
  } catch (error) {
    console.error("Error updating instructor status:", error);
    throw error;
  }
}
