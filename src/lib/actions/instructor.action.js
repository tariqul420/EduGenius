"use server";

import Instructor from "@/models/Instructor";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";
import { objectId } from "../utils";

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
            address: "$instructorId.address",
            phone: "$instructorId.phone",
            email: "$instructorId.email",
            aboutMe: "$instructorId.aboutMe",
            education: "$instructorId.education",
            profession: "$instructorId.profession",
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

export async function getStudents({ instructorId, page = 1, limit = 10 }) {
  try {
    await dbConnect();

    // Get total count of students before pagination
    const totalCount = await Instructor.aggregate([
      {
        $match: {
          instructorId: objectId(instructorId),
        },
      },
      {
        $project: {
          studentCount: { $size: "$students" },
        },
      },
    ]);

    const total = totalCount[0]?.studentCount || 0;

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
          phone: { $ifNull: ["$userData.phone", ""] },
          address: { $ifNull: ["$userData.address", ""] },
          enrolledCourses: { $size: "$filteredCourses" },
        },
      },
      // Add pagination
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ]);

    // Calculate if there's a next page
    const hasNextPage = total > page * limit;

    return {
      students: JSON.parse(JSON.stringify(students)),
      pagination: {
        total,
        page,
        limit,
        hasNextPage,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error getting students by instructor courses ID:", error);
    throw error;
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
        { social: data.social },
        { new: true, upsert: true },
      ),

      User.findOneAndUpdate(
        { _id: objectId(userId) },
        {
          phone: data.phone,
          address: data.address,
          profession: data.profession,
          education: data.education,
          aboutMe: data.aboutMe,
        },
        { new: true },
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
