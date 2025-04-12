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
  excludeSlug, // New parameter to exclude a specific course
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
          ...(excludeSlug && { slug: { $ne: excludeSlug } }), // Exclude the course with the given slug
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

// get last three months course selling data
export async function getLastThreeMonthsCourseSellingData() {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const pipeline = [
      { $match: { instructor: objectId(userId) } }, // Filter by instructor ID
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date
          totalCoursesSold: { $sum: 1 }, // Count the number of courses sold
          totalPrice: { $sum: "$price" }, // Sum the course prices
        },
      },
      {
        $sort: { _id: -1 }, // Sort by date descending
      },
    ];

    const result = await Course.aggregate(pipeline);

    // Format the result to match the desired output
    const formattedResult = result.map((item) => ({
      date: item._id, // Date
      totalCoursesSold: item.totalCoursesSold,
      totalPrice: item.totalPrice,
    }));

    return JSON.parse(JSON.stringify(formattedResult));
  } catch (error) {
    console.error(
      "Error getting last three months course selling data:",
      error,
    );
    throw error;
  }
}

// get total revenue
export async function getRevenueStats() {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Get the current date and calculate the start of the current and previous months
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    // Pipeline to calculate total revenue and revenue growth
    const pipeline = [
      {
        $match: {
          instructor: objectId(userId), // Filter by instructor ID
          createdAt: { $gte: sixMonthsAgo }, // Filter for the last 6 months
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" }, // Group by month
          },
          totalRevenue: { $sum: "$price" }, // Sum the course prices
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ];

    const result = await Course.aggregate(pipeline);

    // Calculate total revenue
    const totalRevenuePipeline = [
      { $match: { instructor: objectId(userId) } }, // Filter by instructor ID
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$price" }, // Sum the course prices
        },
      },
    ];

    const totalRevenueResult = await Course.aggregate(totalRevenuePipeline);
    const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;

    // Ensure we have at least two months of data to calculate growth
    if (result.length < 2) {
      return {
        totalRevenue,
        growthRate: 0,
        trend: "No data",
      };
    }

    // Get the most recent month and the previous month
    const latestMonth = result[result.length - 1];
    const previousMonth = result[result.length - 2];

    // Calculate the growth rate
    const growthRate =
      ((latestMonth.totalRevenue - previousMonth.totalRevenue) /
        previousMonth.totalRevenue) *
      100;

    // Determine the trend
    const trend = growthRate > 0 ? "Trending up" : "Trending down";

    return {
      totalRevenue,
      growthRate: Math.abs(growthRate.toFixed(2)), // Return absolute value with 2 decimal places
      trend,
    };
  } catch (error) {
    console.error("Error getting revenue stats:", error);
    throw error;
  }
}

// get total students
export async function getTotalStudentStats() {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Get the current date and calculate the date 6 months ago
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    // Pipeline to calculate total students for the last 6 months
    const pipeline = [
      {
        $match: {
          instructor: objectId(userId), // Filter by instructor ID
          createdAt: { $gte: sixMonthsAgo }, // Filter for the last 6 months
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by month
          totalStudents: { $sum: { $size: "$students" } }, // Count the number of students
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ];

    const result = await Course.aggregate(pipeline);

    // Calculate total students for the last 6 months
    const totalStudents = result.reduce(
      (sum, month) => sum + month.totalStudents,
      0,
    );

    // Calculate growth rate (compare the last two months)
    let growthRate = 0;
    let trend = "No data";

    if (result.length >= 2) {
      const latestMonth = result[result.length - 1];
      const previousMonth = result[result.length - 2];

      growthRate =
        ((latestMonth.totalStudents - previousMonth.totalStudents) /
          previousMonth.totalStudents) *
        100;

      trend = growthRate > 0 ? "Up" : "Down";
    }

    // // Format the result
    // const formattedResult = result.map((item) => ({
    //   month: item._id, // Month (e.g., "2025-04")
    //   totalStudents: item.totalStudents, // Total students for the month
    // }));

    return {
      totalStudents,
      growthRate: Math.abs(growthRate.toFixed(2)), // Return absolute value with 2 decimal places
      trend,
      // monthlyStudents: formattedResult, // Students for each of the last 6 months
    };
  } catch (error) {
    console.error("Error getting total student stats:", error);
    throw error;
  }
}

// get total enrolment
export async function getTotalEnrolmentStats() {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Get the current date and calculate the date 6 months ago
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

    // Pipeline to calculate total enrolments for the last 6 months
    const pipeline = [
      {
        $match: {
          instructor: objectId(userId), // Filter by instructor ID
          createdAt: { $gte: sixMonthsAgo }, // Filter for the last 6 months
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by month
          totalEnrolment: { $sum: { $size: "$students" } }, // Count the number of enrolments
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ];

    const result = await Course.aggregate(pipeline);

    // Calculate total enrolments for the last 6 months
    const totalEnrolment = result.reduce(
      (sum, month) => sum + month.totalEnrolment,
      0,
    );

    // Calculate growth rate (compare the last two months)
    let growthRate = 0;
    let trend = "No data";

    if (result.length >= 2) {
      const latestMonth = result[result.length - 1];
      const previousMonth = result[result.length - 2];

      growthRate =
        ((latestMonth.totalEnrolment - previousMonth.totalEnrolment) /
          previousMonth.totalEnrolment) *
        100;

      trend =
        growthRate > 0 ? "Strong student retention" : "Poor student retention";
    }

    // Format the result
    // const formattedResult = result.map((item) => ({
    //   month: item._id, // Month (e.g., "2025-04")
    //   totalEnrolment: item.totalEnrolment, // Total enrolments for the month
    // }));

    return {
      totalEnrolment,
      growthRate: Math.abs(growthRate.toFixed(2)), // Return absolute value with 2 decimal places
      trend,
      // monthlyEnrolments: formattedResult, // Enrolments for each of the last 6 months
    };
  } catch (error) {
    console.error("Error getting total enrolment stats:", error);
    throw error;
  }
}

// get growth rate
export async function getGrowthRate() {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Get the current date and calculate the start of the current and previous periods
    const currentDate = new Date();
    const startOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const startOfPreviousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );

    // Pipeline to calculate total enrolments for the last two months
    const pipeline = [
      {
        $match: {
          instructor: objectId(userId), // Filter by instructor ID
          createdAt: { $gte: startOfPreviousMonth }, // Filter for the last two months
        },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $gte: ["$createdAt", startOfCurrentMonth] },
              "current",
              "previous",
            ],
          }, // Group into "current" and "previous" periods
          totalEnrolment: { $sum: { $size: "$students" } }, // Count the number of enrolments
        },
      },
    ];

    const result = await Course.aggregate(pipeline);

    // Extract current and previous enrolments
    const currentEnrolment =
      result.find((item) => item._id === "current")?.totalEnrolment || 0;
    const previousEnrolment =
      result.find((item) => item._id === "previous")?.totalEnrolment || 0;

    // Calculate growth rate
    let growthRate = 0;
    let trend = "No data";

    if (previousEnrolment > 0) {
      growthRate =
        ((currentEnrolment - previousEnrolment) / previousEnrolment) * 100;
      trend = growthRate > 0 ? "increase" : "decrease";
    }

    return {
      currentEnrolment,
      previousEnrolment,
      growthRate: Math.abs(growthRate.toFixed(2)), // Return absolute value with 2 decimal places
      trend,
    };
  } catch (error) {
    console.error("Error getting growth rate:", error);
    throw error;
  }
}
