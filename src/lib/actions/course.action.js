"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import dbConnect from "../dbConnect";
import { objectId } from "../utils";

import Category from "@/models/Category";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import Module from "@/models/Module";
import Student from "@/models/Student";

export async function getCourses({
  categorySlugs = [],
  level,
  search,
  page = 1,
  limit = 10,
  sort,
  instructor,
  excludeSlug,
} = {}) {
  try {
    await dbConnect();

    // Find categories matching the provided slugs
    const categories = categorySlugs.length
      ? await Category.find({
          slug: { $in: categorySlugs },
        })
      : [];
    const categoryIds = categories.map((category) => category._id);

    const skip = (page - 1) * limit;

    const pipeline = [
      // Match courses based on criteria
      {
        $match: {
          ...(instructor && { instructor: objectId(instructor) }),
          ...(categoryIds.length > 0 && { category: { $in: categoryIds } }),
          ...(level && { level }),
          ...(search && {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { level: { $regex: search, $options: "i" } },
            ],
          }),
          ...(excludeSlug && { slug: { $ne: excludeSlug } }),
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
      // Lookup category details
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      // Lookup ratings
      {
        $lookup: {
          from: "ratings",
          localField: "_id", // Assuming ratings references course by course _id
          foreignField: "course",
          as: "ratingsData",
        },
      },
      // Unwind instructor and category (single values)
      { $unwind: "$instructorDetails" },
      { $unwind: "$categoryDetails" },
      // Add field for average rating
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: "$ratingsData" }, 0] },
              then: { $avg: "$ratingsData.rating" },
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
          instructor: {
            _id: "$instructorDetails._id",
            name: "$instructorDetails.name",
          },
        },
      },
    ];

    // Add sorting stage if sort is provided
    if (sort) {
      pipeline.push({
        $sort: {
          ...(sort === "top-rated" && { averageRating: -1 }),
          ...(sort === "latest" && { createdAt: -1 }),
          ...(sort === "oldest" && { createdAt: 1 }),
          ...(sort === "category-related" && { "category.slug": -1 }),
        },
      });
    }

    // Pagination: Skip and limit
    pipeline.push({ $skip: skip }, { $limit: limit });

    const courses = await Course.aggregate(pipeline);

    // Count total documents matching the query
    const total = await Course.countDocuments({
      ...(instructor && { instructor: objectId(instructor) }),
      ...(categoryIds.length > 0 && { category: { $in: categoryIds } }),
      ...(level && { level }),
      ...(search && {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { level: { $regex: search, $options: "i" } },
        ],
      }),
      ...(excludeSlug && { slug: { $ne: excludeSlug } }),
    });

    const hasNextPage = total > page * limit;

    return { courses: JSON.parse(JSON.stringify(courses)), total, hasNextPage };
  } catch (error) {
    console.error(error);
    return { courses: [], total: 0, hasNextPage: false };
  }
}

export async function getCourseBySlug(slug) {
  try {
    await dbConnect();

    const courses = await Course.aggregate([
      {
        $match: { slug },
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
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "course",
          as: "ratingsData",
        },
      },
      { $unwind: "$instructorDetails" },
      { $unwind: "$categoryDetails" },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: "$ratingsData" }, 0] },
              then: { $avg: "$ratingsData.rating" },
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
          students: 1,
          instructor: {
            _id: "$instructorDetails._id",
            name: "$instructorDetails.name",
            email: "$instructorDetails.email",
            firstName: "$instructorDetails.firstName",
            lastName: "$instructorDetails.lastName",
            profilePicture: "$instructorDetails.profilePicture",
            role: "$instructorDetails.role",
            slug: "$instructorDetails.slug",
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

export async function deleteCourse({ courseId, path, instructor }) {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();
    const role = sessionClaims?.role;
    if (role !== "admin" && role !== "instructor") {
      throw new Error("Don't have permission to perform this action!");
    }

    await Course.findOneAndDelete({
      _id: objectId(courseId),
      instructor: objectId(instructor),
    });
    await Module.deleteMany({ course: objectId(courseId) });
    await Lesson.deleteMany({ course: objectId(courseId) });

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
        $match: { course: objectId(courseId) }, // Match modules for the given course
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

export async function getCourseForEnrollStudent(studentId) {
  try {
    await dbConnect();

    const id = objectId(studentId);

    const student = await Student.findOne({ student: id }).populate({
      path: "courses",
      select: "title thumbnail slug instructor",
      populate: {
        path: "instructor",
        select: "firstName lastName",
      },
    });

    if (!student) {
      return { courses: [] };
    }

    // Transform instructor names if needed
    const result = JSON.parse(JSON.stringify(student));
    result.courses = result.courses.map((course) => ({
      ...course,
      instructor: course.instructor
        ? {
            _id: course.instructor._id,
            name: `${course.instructor.firstName} ${course.instructor.lastName || ""}`.trim(),
          }
        : null,
    }));

    return result;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
}

export async function getCourseAdminInstructor({
  page = 1,
  limit = 10,
  search = "",
  instructor = false,
} = {}) {
  try {
    await dbConnect();

    // Authentication and authorization
    const { sessionClaims } = await auth();
    const role = sessionClaims?.role;
    const userId = sessionClaims?.userId;

    if (role !== "instructor" && role !== "admin") {
      throw new Error("Don't have permission to perform this action!");
    }

    const skip = (page - 1) * limit;

    // Build the aggregation pipeline
    const pipeline = [
      // Match courses based on criteria
      {
        $match: {
          ...(instructor && { instructor: objectId(userId) }),
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
          as: "instructor",
        },
      },
      // Lookup category details
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      // Lookup ratings
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "course",
          as: "ratingsData",
        },
      },
      // Unwind instructor and category (single values)
      { $unwind: "$instructor" },
      { $unwind: "$category" },
      // Add fields for average rating and total revenue
      {
        $addFields: {
          students: { $size: { $ifNull: ["$students", []] } },
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: "$ratingsData" }, 0] },
              then: { $avg: "$ratingsData.rating" },
              else: 0,
            },
          },
          totalRevenue: {
            $multiply: [
              { $size: { $ifNull: ["$students", []] } },
              {
                $multiply: [
                  { $ifNull: ["$price", 0] }, // Course price
                  {
                    $subtract: [
                      1,
                      { $divide: [{ $ifNull: ["$discount", 0] }, 100] }, // Discount as a fraction
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
      // Project specific fields
      {
        $project: {
          _id: 1,
          title: 1,
          price: 1,
          language: 1,
          averageRating: 1,
          totalRevenue: 1,
          students: 1,
          slug: 1,
          category: {
            _id: "$category._id",
            name: "$category.name",
            slug: "$category.slug",
          },
          instructor: {
            _id: "$instructor._id",
            firstName: "$instructor.firstName",
            lastName: "$instructor.lastName",
            email: "$instructor.email",
            profilePicture: "$instructor.profilePicture",
            slug: "$instructor.slug",
          },
        },
      },
      // Pagination: Skip and limit
      { $skip: skip },
      { $limit: limit },
    ];

    // Execute aggregation
    const courses = await Course.aggregate(pipeline);

    // Count total documents matching the query
    const total = await Course.countDocuments({
      ...(instructor && { instructor: objectId(userId) }),
      ...(search && {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { level: { $regex: search, $options: "i" } },
        ],
      }),
    });

    const totalPages = Math.ceil(total / limit);

    return JSON.parse(
      JSON.stringify({
        courses,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      }),
    );
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error("Failed to fetch courses");
  }
}
