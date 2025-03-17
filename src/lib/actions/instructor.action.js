"use server";

import User from "@/models/User";

export async function getInstructors() {
  try {
    return await User.find({ role: "instructor" });
  } catch (error) {
    console.error("Error getting instructors:", error);
  }
}
