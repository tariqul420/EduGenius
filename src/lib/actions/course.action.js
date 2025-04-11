"use server";

import Category from "@/models/Category";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import Module from "@/models/Module";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";
import { objectId } from "../utils";

export async function getCourses({
  categorySlugs = [],
  level,
  search,
  page = 1,
  limit = 5,
  sort,
  instructor,
} = {}) {
  try {
    await dbConnect();

    // Find categories matching the provided slugs
    const categories = await Category.find({
      slug: { $in: categorySlugs },
    });
    const categoryIds = categories.map((category) => category._id);

    const skip = (page - 1) * limit;

    const pipeline = [
      // Match courses based on categorySlug or search query
      {
        $match: {
          ...(instructor && { instructor: objectId(instructor) }), // Match instructor by ObjectId
          ...(categoryIds.length > 0 && { category: { $in: categoryIds } }), // Match multiple categories
          ...(level && { level }),
          ...(search && {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { level: { $regex: search, $options: "i" } },
            ],
          }),
        },
      },
      // Lookup instructor details
      {
        $lookup: {
          from: "users",
          localField: "instructor",
          foreignField: "_id",
          as: "instructorDetails",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$instructorDetails" },
      { $unwind: "$categoryDetails" },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: "$ratings" }, 0] },
              then: { $avg: "$ratings.rating" },
              else: 0,
            },
          },
        },
      },

      // Project specific fields
      {
        $project: {
          _id: 1,
          title: 1,
          price: 1,
          discount: 1,
          language: 1,
          level: 1,
          thumbnail: 1,
          averageRating: 1,
          slug: 1,
          category: {
            _id: "$categoryDetails._id",
            name: "$categoryDetails.name",
            slug: "$categoryDetails.slug",
          },
        },
      },
    ];

    // Add sorting stage if sort is provided
    if (sort) {
      pipeline.push({
        $sort: {
          ...(sort === "top-rated" && { averageRating: -1 }), // Sort by highest rating
          ...(sort === "latest" && { createdAt: -1 }), // Sort by latest
          ...(sort === "oldest" && { createdAt: 1 }), // Sort by oldest
        },
      });
    }

    // Pagination: Skip and limit
    pipeline.push({ $skip: skip }, { $limit: limit });

    const courses = await Course.aggregate(pipeline);

    // Count total documents matching the query
    const total = await Course.estimatedDocumentCount();

    const hasNextPage = total > page * limit;

    return { courses: JSON.parse(JSON.stringify(courses)), total, hasNextPage };
  } catch (error) {
    console.error(error);
  }
}

export async function getCourseBySlug(slug) {
  try {
    await dbConnect();

    const courses = await Course.aggregate([
      {
        $match: { slug: slug },
      },
      {
        $lookup: {
          from: "users",
          localField: "instructor",
          foreignField: "_id",
          as: "instructorDetails",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$instructorDetails" },
      { $unwind: "$categoryDetails" },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: "$ratings" }, 0] },
              then: { $avg: "$ratings.rating" },
              else: 0,
            },
          },
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          thumbnail: 1,
          language: 1,
          level: 1,
          discount: 1,
          price: 1,
          duration: 1,
          averageRating: 1,
          slug: 1,
          students: { $size: "$students" },
          instructor: {
            _id: "$instructorDetails._id",
            name: "$instructorDetails.name",
            email: "$instructorDetails.email",
          },
          category: {
            _id: "$categoryDetails._id",
            name: "$categoryDetails.name",
            slug: "$categoryDetails.slug",
            description: "$categoryDetails.description",
          },
        },
      },
      { $limit: 1 },
    ]);

    if (courses.length === 0) {
      return null; // Return null if no course is found
    }

    return JSON.parse(JSON.stringify(courses[0]));
  } catch (error) {
    console.error("Error getting Course by slug:", error);
    throw error;
  }
}

export async function createCourse({ data, path }) {
  console.log("Creating course with data:", data);
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Add the userId as the instructor for the course
    const newCourse = new Course({ ...data, instructor: userId });
    await newCourse.save();

    revalidatePath(path);
    return JSON.parse(JSON.stringify(newCourse));
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}

export async function updateCourse({ courseId, data, path }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId, instructor: userId },
      data,
      { new: true },
    );

    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedCourse));
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
}

export async function deleteCourse({ courseId, path }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    await Course.findOneAndDelete({
      _id: courseId,
      instructor: objectId(userId),
    });
    revalidatePath(path);
  } catch (error) {
    console.error("Error deleting course:", error);
  }
}

// Server action for adding course curriculum
export async function addCourseCurriculum({ courseId, data, path }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const courseModule = await Module.create({
      name: data.name,
      course: objectId(courseId),
    });

    if (!courseModule) {
      throw new Error("Failed to create course module");
    }

    const lessons = data.lessons.map((lesson) => ({
      ...lesson,
      course: objectId(courseId),
      module: courseModule._id,
    }));
    await Lesson.insertMany(lessons);

    revalidatePath(path);
    return JSON.parse(JSON.stringify(courseModule));
  } catch (error) {
    console.error("Error adding course curriculum:", error);
    throw error;
  }
}

export async function getCourseCurriculum(courseId) {
  try {
    await dbConnect();

    const courseCurriculum = await Module.aggregate([
      {
        $match: { course: courseId }, // Match modules for the given course
      },
      {
        $lookup: {
          from: "lessons", // Join with the lessons collection
          localField: "_id", // Match module ID
          foreignField: "module", // Match lessons by module ID
          as: "lessons", // Output lessons as an array
        },
      },
      {
        $project: {
          _id: 1, // Include module ID
          name: 1, // Include module name
          createdAt: 1, // Include module creation date
          updatedAt: 1, // Include module update date
          lessons: {
            $map: {
              input: "$lessons", // Iterate over lessons
              as: "lesson",
              in: {
                _id: "$$lesson._id", // Include lesson ID
                title: "$$lesson.title", // Include lesson title
                videoUrl: "$$lesson.videoUrl", // Include lesson video URL
                isFinished: "$$lesson.isFinished", // Include lesson completion status
                createdAt: "$$lesson.createdAt", // Include lesson creation date
                updatedAt: "$$lesson.updatedAt", // Include lesson update date
              },
            },
          },
        },
      },
    ]);

    const objCourseCurriculum = courseCurriculum[0] || {};
    return JSON.parse(JSON.stringify(objCourseCurriculum));
  } catch (error) {
    console.error("Error getting course curriculum:", error);
    throw error;
  }
}

export async function updateCourseCurriculum({
  moduleId,
  lessonIds,
  data,
  path,
}) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    await Module.findOneAndUpdate(
      { _id: objectId(moduleId) },
      { name: data.name, isFinished: false },
      { new: true },
    );

    await Lesson.updateMany(
      { _id: { $in: lessonIds } },
      {
        $set: {
          ...data.lessons,
          isFinished: false,
        },
      },
    );

    revalidatePath(path);
  } catch (error) {
    console.error("Error updating course curriculum:", error);
  }
}
