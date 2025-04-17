"use server";

import InstructorInfo from "@/models/InstructorInfo";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";
import { objectId } from "../utils";

export async function getInstructorInfo() {
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

export async function updateStudentStatus({ instructorId, status, path }) {
  try {
    await dbConnect();

    await InstructorInfo.findOneAndUpdate(
      instructorId,
      { status },
      { new: true },
    );

    revalidatePath(path);
    return { success: true };
  } catch (error) {
    console.error("Error updating instructor status:", error);
    throw error;
  }
}
