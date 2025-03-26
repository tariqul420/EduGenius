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
    const skip = (page - 1) * limit;

    // Fetch category IDs
    let categoryIds = [];
    if (categories.length > 0) {
      const categoryDocs = await Category.find({ slug: { $in: categories } })
        .select("_id")
        .lean();
      categoryIds = categoryDocs.map((category) => category._id);
    }

    // Build the query
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
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "blog",
          as: "comments",
        }
      },
      {
        $addFields: {
          commentCount: { $size: "$comments" },
          authorDetails: { $arrayElemAt: ["$authorDetails", 0] }
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          content: 1,
          slug: 1,
          thumbnail: 1,
          createdAt: 1,
          updatedAt: 1,
          category: 1,
          commentCount: 1,
          user: {
            _id: "$authorDetails._id",
            firstName: "$authorDetails.firstName",
            lastName: "$authorDetails.lastName"
          }
        }
      },
      {
        $sort: sort === "popular"
          ? { commentCount: -1, createdAt: -1 }
          : { createdAt: -1 }
      },
      { $skip: skip },
      { $limit: limit }
    ]);

    const total = await Blog.estimatedDocumentCount();
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
      .populate({
        path: "author",
        select: "_id firstName lastName email role profilePicture slug",
      })
      .populate({
        path: "category",
        select: "_id name",
      })
      .lean();

    if (blog) {
      delete blog.updatedAt;
    }

    return blog;
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}

