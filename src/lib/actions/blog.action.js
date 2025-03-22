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

    const blog = await Blog.findOne({ slug: slug })
      .populate("author")
      .populate("category")
      .populate("comments")
      .lean();

    return blog;
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}