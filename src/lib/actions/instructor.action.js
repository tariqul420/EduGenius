"use server";

import User from "@/models/User";
import dbConnect from "../dbConnect";

export async function getInstructors({ role, page = 1, limit = 5 }) {
  try {
    await dbConnect();
    const users = await User.find({ role }).limit(limit * page);
    const total = await User.countDocuments({ role });
    const hasNextPage = total > limit * page;

    return {
      users,
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
    return await User.findOne({ slug });
  } catch (error) {
    console.error("Error getting instructor by slug:", error);
  }
}
