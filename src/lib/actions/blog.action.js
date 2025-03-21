"use server";

import Blog from "@/models/Blog";
import Category from "@/models/Category";
import dbConnect from "../dbConnect";

export async function getBlogs({
  search,
  page = 1,
  limit = 5,
  categories = [],
} = {}) {
  try {
    await dbConnect();

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
        category: { $in: categoryIds }, // Filter by category IDs
      }),
    };

    // Fetch blogs and convert them to plain objects using .lean()
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "firstName lastName")
      .populate("category", "name slug") // Populate category fields
      .lean();

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
