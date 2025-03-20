import Course from "@/models/Course";
import dbConnect from "../dbConnect";

export async function getCourses({
  categorySlug,
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
          from: "users", // Collection name for users
          localField: "instructor",
          foreignField: "_id",
          as: "instructorDetails",
        },
      },
      // Unwind instructor details to make it a single object
      { $unwind: "$instructorDetails" },
      // Calculate average rating from the ratings array
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: "$ratings" }, 0] }, // Check if ratings array is not empty
              then: { $avg: "$ratings.rating" }, // Calculate average rating
              else: 0, // Default to 0 if no ratings
            },
          },
        },
      },
      // Project specific fields
      {
        $project: {
          title: 1,
          description: 1,
          categorySlug: 1,
          thumbnail: 1,
          language: 1,
          level: 1,
          discount: 1,
          price: 1,
          duration: 1,
          averageRating: 1, // Include the calculated average rating
          students: { $size: "$students" }, // Count the number of students
          instructor: {
            _id: "$instructorDetails._id",
            name: "$instructorDetails.name",
            email: "$instructorDetails.email",
          },
        },
      },
      // Pagination: Skip and limit

      { $limit: limit * page },
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

    return {
      courses,
      total,
      hasNextPage,
    };
  } catch (error) {
    console.error(error);
  }
}
