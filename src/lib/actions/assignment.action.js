"use server";

import Assignment from "@/models/Assignment";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";

export async function createAssignment({ courseId, data }) {
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
