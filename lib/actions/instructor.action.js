"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import dbConnect from "../db-connect";
import { objectId } from "../utils";

import Instructor from "@/models/Instructor";
import User from "@/models/User";

export async function getInstructors({ page = 1, limit = 5 }) {
  try {
    await dbConnect();
    const instructors = await Instructor.find(
      {},
      { _id: 0, instructorId: 1, social: 1 },
    )
      .populate(
        "instructorId",
        "profilePicture firstName lastName slug profession",
      )
      .limit(limit * page)
      .lean();
    const total = await Instructor.estimatedDocumentCount();
    const hasNextPage = total > limit * page;

    return {
      instructors: JSON.parse(JSON.stringify(instructors)),
      total,
      hasNextPage,
    };
  } catch (error) {
    console.error("Error getting instructors:", error);
  }
}

export async function getInstructorBySlug(slug) {
  try {
    // Connect to the database
    await dbConnect();

    // Find user by slug to get instructorId
    const user = await User.findOne({ slug });
    if (!user) {
      console.error(`No user found for slug: ${slug}`);
      return null;
    }

    // Aggregate to get instructor data with calculated ratings, counts, and lesson counts
    const [instructor] = await Instructor.aggregate([
      // Match instructor by instructorId
      {
        $match: { instructorId: user._id },
      },
      // Lookup user details
      {
        $lookup: {
          from: "users",
          localField: "instructorId",
          foreignField: "_id",
          as: "instructorId",
        },
      },
      // Unwind instructorId to get single object
      {
        $unwind: {
          path: "$instructorId",
          preserveNullAndEmptyArrays: true, // Handle missing user data
        },
      },
      // Project only needed fields from instructorId
      {
        $set: {
          instructorId: {
            profilePicture: "$instructorId.profilePicture",
            firstName: "$instructorId.firstName",
            lastName: "$instructorId.lastName",
            email: "$instructorId.email",
          },
        },
      },
      // Lookup courses
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "courses",
        },
      },
      // Unwind courses to process each course (preserve empty courses)
      {
        $unwind: {
          path: "$courses",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Lookup ratings for each course
      {
        $lookup: {
          from: "reviews",
          localField: "courses.ratings",
          foreignField: "_id",
          as: "courses.ratings",
        },
      },
      // Lookup lessons for each course
      {
        $lookup: {
          from: "lessons",
          localField: "courses._id",
          foreignField: "course",
          as: "courses.lessons",
        },
      },
      // Group back to restore instructor structure
      {
        $group: {
          _id: "$_id",
          instructorId: { $first: "$instructorId" },
          social: { $first: "$social" },
          phone: { $first: "$phone" },
          address: { $first: "$address" },
          profession: { $first: "$profession" },
          education: { $first: "$education" },
          aboutMe: { $first: "$aboutMe" },
          students: { $first: "$students" },
          courses: {
            $push: {
              $cond: [
                { $ifNull: ["$courses", false] },
                {
                  title: "$courses.title",
                  description: "$courses.description",
                  slug: "$courses.slug",
                  ratings: { $ifNull: ["$courses.ratings", []] },
                  students: { $ifNull: ["$courses.students", []] },
                  lessons: { $ifNull: ["$courses.lessons", []] },
                },
                "$$REMOVE", // Exclude null courses
              ],
            },
          },
        },
      },
      // Calculate ratings, counts, and lesson count for each course
      {
        $set: {
          courses: {
            $map: {
              input: "$courses",
              as: "course",
              in: {
                title: "$$course.title",
                description: "$$course.description",
                slug: "$$course.slug",
                ratings: "$$course.ratings",
                students: "$$course.students",
                lessonCount: { $size: "$$course.lessons" }, // Add lesson count
                avgRating: {
                  $cond: [
                    {
                      $and: [
                        { $isArray: "$$course.ratings" },
                        { $gt: [{ $size: "$$course.ratings" }, 0] },
                      ],
                    },
                    {
                      $divide: [
                        { $sum: "$$course.ratings.rating" },
                        { $size: "$$course.ratings" },
                      ],
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      },
      // Calculate instructor's average rating
      {
        $set: {
          avgRating: {
            $cond: [
              {
                $and: [
                  { $isArray: "$courses" },
                  { $gt: [{ $size: "$courses" }, 0] },
                  {
                    $gt: [
                      {
                        $sum: {
                          $map: {
                            input: "$courses",
                            as: "course",
                            in: {
                              $cond: [
                                { $isArray: "$$course.ratings" },
                                { $size: "$$course.ratings" },
                                0,
                              ],
                            },
                          },
                        },
                      },
                      0,
                    ],
                  },
                ],
              },
              {
                $divide: [
                  {
                    $sum: {
                      $map: {
                        input: "$courses",
                        as: "course",
                        in: {
                          $cond: [
                            { $isArray: "$$course.ratings" },
                            { $sum: "$$course.ratings.rating" },
                            0,
                          ],
                        },
                      },
                    },
                  },
                  {
                    $sum: {
                      $map: {
                        input: "$courses",
                        as: "course",
                        in: {
                          $cond: [
                            { $isArray: "$$course.ratings" },
                            { $size: "$$course.ratings" },
                            0,
                          ],
                        },
                      },
                    },
                  },
                ],
              },
              0,
            ],
          },
        },
      },
      // Format ratings to 2 decimal places and clean up courses
      {
        $set: {
          courses: {
            $map: {
              input: "$courses",
              as: "course",
              in: {
                $mergeObjects: [
                  {
                    title: "$$course.title",
                    description: "$$course.description",
                    slug: "$$course.slug",
                    ratings: "$$course.ratings",
                    students: "$$course.students",
                    lessonCount: "$$course.lessonCount",
                    avgRating: { $round: ["$$course.avgRating", 2] },
                  },
                ],
              },
            },
          },
          avgRating: { $round: ["$avgRating", 2] },
        },
      },
    ]);

    if (!instructor) {
      console.error(`No instructor found for user ID: ${user._id}`);
      return null;
    }

    return JSON.parse(JSON.stringify(instructor));
  } catch (error) {
    console.error("Error getting instructor by slug:", {
      message: error.message,
      stack: error.stack,
      slug,
    });
    return null;
  }
}

// get student for instructors
export async function getStudents({
  instructorId,
  page = 1,
  limit = 10,
  search = "",
} = {}) {
  try {
    await dbConnect();

    const skip = (page - 1) * limit;

    // Create search match stage
    const searchMatch = search
      ? {
          $match: {
            $or: [
              { "userData.firstName": { $regex: search, $options: "i" } },
              { "userData.lastName": { $regex: search, $options: "i" } },
            ],
          },
        }
      : { $match: {} };

    const students = await Instructor.aggregate([
      // Match the instructor
      {
        $match: {
          instructorId: objectId(instructorId),
        },
      },
      // Unwind the students array
      {
        $unwind: "$students",
      },
      // Lookup students collection
      {
        $lookup: {
          from: "students",
          localField: "students",
          foreignField: "student",
          as: "studentData",
        },
      },
      // Unwind the studentData array
      {
        $unwind: "$studentData",
      },
      // Lookup users collection
      {
        $lookup: {
          from: "users",
          localField: "studentData.student",
          foreignField: "_id",
          as: "userData",
        },
      },
      // Unwind the userData array
      {
        $unwind: "$userData",
      },
      // Apply search filter on student names
      searchMatch,
      // Filter courses to only include those from this instructor
      {
        $addFields: {
          filteredCourses: {
            $filter: {
              input: "$studentData.courses",
              as: "course",
              cond: {
                $in: ["$$course", "$courses"],
              },
            },
          },
        },
      },
      // Project the final shape with course count and default values
      {
        $project: {
          _id: 0,
          studentId: "$studentData.student",
          name: {
            $concat: [
              { $ifNull: ["$userData.firstName", ""] },
              " ",
              { $ifNull: ["$userData.lastName", ""] },
            ],
          },
          profilePicture: { $ifNull: ["$userData.profilePicture", ""] },
          email: "$userData.email",
          enrolledCourses: { $size: "$filteredCourses" },
        },
      },
      // Sort by name for consistent ordering
      {
        $sort: { name: 1 },
      },
      // Add pagination
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    // Get total count with the same match and search conditions
    const totalCount = await Instructor.aggregate([
      // Match the instructor
      {
        $match: {
          instructorId: objectId(instructorId),
        },
      },
      // Unwind the students array
      {
        $unwind: "$students",
      },
      // Lookup students collection
      {
        $lookup: {
          from: "students",
          localField: "students",
          foreignField: "student",
          as: "studentData",
        },
      },
      // Unwind the studentData array
      {
        $unwind: "$studentData",
      },
      // Lookup users collection
      {
        $lookup: {
          from: "users",
          localField: "studentData.student",
          foreignField: "_id",
          as: "userData",
        },
      },
      // Unwind the userData array
      {
        $unwind: "$userData",
      },
      // Apply search filter
      searchMatch,
      // Count the matching documents
      {
        $count: "total",
      },
    ]);

    const total = totalCount[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    return {
      students: JSON.parse(JSON.stringify(students)),
      pagination: {
        total,
        page,
        limit,
        hasNextPage: page < totalPages,
        totalPages,
      },
    };
  } catch (error) {
    console.error("Error getting students by instructor courses ID:", error);
    throw new Error("Failed to fetch students");
  }
}

export async function updateInstructor({ data, path }) {
  try {
    await dbConnect();
    // Get the current logged-in user
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    await Promise.all([
      Instructor.findOneAndUpdate(
        { instructorId: objectId(userId) },
        {
          social: data.social,
          phone: data.phone,
          address: data.address,
          profession: data.profession,
          education: data.education,
          aboutMe: data.aboutMe,
        },
        { new: true, upsert: true },
      ),
    ]);

    return revalidatePath(path);
  } catch (error) {
    console.error("Error updating instructor:", error);
    throw error;
  }
}

export async function getAdditionalInfo() {
  try {
    await dbConnect();

    // Get the current logged-in user
    const { sessionClaims } = await auth();
    const userId = sessionClaims?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const instructor = await Instructor.findOne({
      instructorId: objectId(userId),
    }).populate(
      "instructorId",
      "phone address social profession education aboutMe",
    );

    if (!instructor) {
      return null;
    }

    return JSON.parse(JSON.stringify(instructor));
  } catch (error) {
    console.error("Error getting additional info:", error);
  }
}

export async function getInstructorByAdmin({
  page = 1,
  limit = 10,
  search = "",
} = {}) {
  try {
    await dbConnect();

    const { sessionClaims } = await auth();
    const role = sessionClaims?.role;

    if (role !== "admin") {
      throw new Error("Don't have permission to perform this action!");
    }

    const skip = (page - 1) * limit;

    // Create match stage for search
    const matchStage = search
      ? {
          $match: {
            $or: [
              { "instructor.firstName": { $regex: search, $options: "i" } },
              { "instructor.lastName": { $regex: search, $options: "i" } },
            ],
          },
        }
      : { $match: {} };

    const instructors = await Instructor.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "instructorId",
          foreignField: "_id",
          as: "instructor",
        },
      },
      {
        $unwind: {
          path: "$instructor",
          preserveNullAndEmptyArrays: true,
        },
      },
      // Apply search filter after lookup to access instructor fields
      matchStage,
      // Lookup courses using instructorId to match Course.instructor
      {
        $lookup: {
          from: "courses",
          localField: "instructorId",
          foreignField: "instructor",
          as: "courses",
        },
      },
      // Project the required fields and calculate stats
      {
        $project: {
          instructorId: "$instructorId",
          firstName: "$instructor.firstName",
          lastName: "$instructor.lastName",
          email: "$instructor.email",
          slug: "$instructor.slug",
          phone: "$phone",
          createdAt: "$createdAt",
          studentCount: { $size: { $ifNull: ["$students", []] } },
          courseCount: { $size: { $ifNull: ["$courses", []] } },
          totalRevenue: {
            $sum: {
              $map: {
                input: { $ifNull: ["$courses", []] },
                as: "course",
                in: {
                  $multiply: [
                    { $size: { $ifNull: ["$$course.students", []] } },
                    {
                      $multiply: [
                        { $ifNull: ["$$course.price", 0] }, // Course price
                        {
                          $subtract: [
                            1,
                            {
                              $divide: [
                                { $ifNull: ["$$course.discount", 0] },
                                100,
                              ],
                            }, // Discount as a fraction
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    // Get total count of instructors matching the search
    const totalInstructors = search
      ? await Instructor.aggregate([
          {
            $lookup: {
              from: "users",
              localField: "instructorId",
              foreignField: "_id",
              as: "instructor",
            },
          },
          {
            $unwind: {
              path: "$instructor",
              preserveNullAndEmptyArrays: true,
            },
          },
          matchStage,
          { $count: "total" },
        ]).then((result) => result[0]?.total || 0)
      : await Instructor.estimatedDocumentCount();

    const totalPages = Math.ceil(totalInstructors / limit);

    return JSON.parse(
      JSON.stringify({
        instructors,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalInstructors,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      }),
    );
  } catch (error) {
    console.error("Error fetching instructors:", error);
    throw new Error("Failed to fetch instructors");
  }
}
