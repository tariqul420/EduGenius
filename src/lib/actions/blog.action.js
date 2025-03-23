"use server";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import dbConnect from "../dbConnect";

export async function getBlogs({
  search,
  sort,
  page = 1,
  limit = 5,
  categories = [],
} = {}) {
  try {
    await dbConnect();
    // User;

    const skip = (page - 1) * limit;

    // Fetch category IDs based on slugs
    let categoryIds = [];
    if (categories.length > 0) {
      const categoryDocs = await Category.find({ slug: { $in: categories } })
        .select("_id")
        .lean();
      categoryIds = categoryDocs.map((category) => category._id);
    }

    // Build the query object
    const query = {
      ...(search && {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      }),
      ...(categoryIds.length > 0 && {
        category: { $in: categoryIds },
      }),
    };

    // Fetch blogs and convert them to plain objects using .lean()
    // const blogs = await Blog.find(query)
    //   .sort({ createdAt: -1 })
    //   .skip(skip)
    //   .limit(limit)
    //   .populate("author")
    //   .populate("category", "name slug")
    //   .lean();

    const blogs = await Blog.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorDetails",
        }
      },
      {
        $unwind: "$authorDetails"
      },
      {
        $project: {
          _id: 1,
          title: 1,
          content: 1,
          slug: 1,
          thumbnail: 1,
          createdAt: 1,
          commentCount: { $size: "$comments" },
          authorDetails: 1
        }
      },
      {
        $sort: sort === "popular" ? { commentCount: -1 } : { createdAt: -1 },
      },
      { $limit: limit },
      { $skip: skip },
      {
        $project: {
          _id: 1,
          title: 1,
          content: 1,
          slug: 1,
          comment: "$commentCount",
          thumbnail: 1,
          createdAt: 1,
          user: {
            _id: "$authorDetails._id",
            firstName: "$authorDetails.firstName",
            lastName: "$authorDetails.lastName"
          }
        }
      }
    ]);

    // Count total documents matching the search criteria
    const total = await Blog.countDocuments(query);

    const hasNextPage = total > limit * page;

    return {
      blogs,
      total,
      hasNextPage,
    };
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return { blogs: [], total: 0, hasNextPage: false };
  }
}
export async function getBlogBySlug(slug) {
  try {
    await dbConnect();

    const blogs = await Blog.aggregate([
      {
        $match: { slug: slug }
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
            description: "$categoryDetails.description"
          }
        },
      },
      { $limit: 1 }
    ]);

    if (blogs.length === 0) {
      return null; // Return null if no blog is found
    }

    return blogs[0]; // Return the first blog object
  } catch (error) {
    console.error("Error getting blog by slug:", error);
    throw error;
  }
}
