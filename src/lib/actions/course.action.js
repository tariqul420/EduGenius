import Course from "@/models/Course";
import dbConnect from "../dbConnect";

export async function getCourses({
  categorySlug,
  level,
  search,
  page = 1,
  limit = 5,
} = {}) {
  try {
    await dbConnect();

    const skip = (page - 1) * limit;

    const courses = await Course.aggregate([
      // Match courses based on categorySlug or search query
      {
        $match: {
          ...(categorySlug && { categorySlug }),
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
          // title: 1,
          // description: 1,
          // categorySlug: 1,
          // thumbnail: 1,
          // language: 1,
          // level: 1,
          // discount: 1,
          // price: 1,
          // duration: 1,
          // slug: 1,
          // averageRating: 1,
          // students: { $size: "$students" },
          // instructor: {
          //   _id: "$instructorDetails._id",
          //   name: "$instructorDetails.name",
          //   email: "$instructorDetails.email",
          // },
          // category: {
          //   _id: "$categoryDetails._id",
          //   name: "$categoryDetails.name",
          //   slug: "$categoryDetails.slug",
          //   description: "$categoryDetails.description"
          // },

          // filter out unnecessary fields
          _id: 1,
          title: 1,
          price: 1,
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
      // Pagination: Skip and limit
      { $skip: skip },
      { $limit: limit },
    ]);

    // Count total documents matching the query
    const total = await Course.countDocuments({
      ...(categorySlug && { categorySlug }),
      ...(search && {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { level: { $regex: search, $options: "i" } },
        ],
      }),
    });

    const hasNextPage = total > page * limit;

    return { courses, total, hasNextPage };
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

    return courses[0];
  } catch (error) {
    console.error("Error getting Course by slug:", error);
    throw error; // Rethrow the error for better error handling upstream
  }
}
