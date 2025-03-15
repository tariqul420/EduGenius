"use server";

import Course from "@/models/Course";
import dbConnect from "../dbConnect";

export async function createCourse(courseData) {
  try {
    await dbConnect();
    const newCourse = new Course(courseData);
    return await newCourse.save();
  } catch (error) {
    // console.log(error);
    throw new Error("Failed to create course");
  }
}

export async function updateCourse(courseId, courseData) {
  try {
    await dbConnect();
    return await Course.findByIdAndUpdate(courseId, courseData, { new: true });
  } catch (error) {
    // console.log(error);
    throw new Error("Failed to update course");
  }
}

export async function deleteCourse(courseId) {
  try {
    await dbConnect();
    return await Course.findByIdAndDelete(courseId);
  } catch (error) {
    // console.log(error);
    throw new Error("Failed to delete course");
  }
}
