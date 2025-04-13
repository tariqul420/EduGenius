"use server";

import Instructor from "@/models/Instructor";
import User from "@/models/User";
import dbConnect from "../dbConnect";

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

export async function getStudentsByInstructorCoursesId(instructorId) {
  try {
    await dbConnect();

    // Find the instructor by their ID and populate the students field
    const instructor = await Instructor.findOne({ instructorId }).populate({
      path: "students",
      select: "name email", // Select specific fields if needed
    });

    if (!instructor) {
      throw new Error("Instructor not found");
    }

    return JSON.parse(JSON.stringify(instructor.students));
  } catch (error) {
    console.error("Error getting students by instructor courses ID:", error);
    throw error;
  }
}
