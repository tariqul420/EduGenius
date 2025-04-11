"use server";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import Comments from "@/models/Comments";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";

export async function createBlog({ blog, path }) {
  try {
    await dbConnect();

    const blogData = {
      ...blog,
      author: new mongoose.Types.ObjectId(blog.author),
      category: new mongoose.Types.ObjectId(blog.category),
    };

    await Blog.create(blogData);

    if (path) {
      revalidatePath(path);
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating blog:", error);
    return {
      success: false,
      error: error.message || "Failed to create blog",
    };
  }
}

export async function getBlogs({
  search,
  sort,
  page = 1,
  limit = 4,
  categories = [],
} = {}) {
  try {
    await dbConnect();

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
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "blog",
          as: "comments",
        },
      },
      {
        $addFields: {
          commentCount: { $size: "$comments" },
          authorDetails: { $arrayElemAt: ["$authorDetails", 0] },
        },
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
            lastName: "$authorDetails.lastName",
          },
        },
      },
      {
        $sort:
          sort === "popular"
            ? { commentCount: -1, createdAt: -1 }
            : { createdAt: -1 },
      },
      { $limit: limit * page },
    ]);

    const total = await Blog.estimatedDocumentCount();
    const hasNextPage = total > limit * page;

    return {
      blogs: JSON.parse(JSON.stringify(blogs)),
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

    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}

export async function getBlogsByUser({ userId, page = 1, limit = 6 }) {
  try {
    await dbConnect();

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return { blogs: [], total: 0, hasNextPage: false };
    }

    // Convert string ID to ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Find blogs with pagination
    const blogs = await Blog.find({ author: objectId })
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await Blog.countDocuments({ author: objectId });
    // const hasNextPage = skip + blogs.length < total;
    const hasNextPage = total > limit * page;

    return {
      blogs: JSON.parse(JSON.stringify(blogs)),
      total,
      hasNextPage,
    };
  } catch (error) {
    console.error("Error fetching blogs by user:", error);
    return { blogs: [], total: 0, hasNextPage: false };
  }
}

export async function deleteBlogById(blogId, path) {
  try {
    await dbConnect();

    const blogObjectId = new mongoose.Types.ObjectId(blogId);

    const commentDeletionResult = await Comments.deleteMany({
      blog: blogObjectId,
    });

    // Delete the blog
    const blogDeletionResult = await Blog.findOneAndDelete({
      _id: blogObjectId,
    });

    // Check if the blog was found and deleted
    if (!blogDeletionResult) {
      return {
        delete: false,
        status: 400,
        error: "Blog not found or not authorized",
      };
    }

    // Revalidate the cache for the given path
    revalidatePath(path);

    return {
      delete: true,
      message: `Blog and ${commentDeletionResult.deletedCount} associated comment(s) deleted successfully`,
    };
  } catch (error) {
    console.error("Delete error:", error);
    return {
      delete: false,
      error: "Server error",
    };
  }
}

export async function updateBlog({ blogId, blog, path }) {
  try {
    await dbConnect();

    const blogData = {
      ...blog,
      author: new mongoose.Types.ObjectId(blog.author),
      category: new mongoose.Types.ObjectId(blog.category),
    };

    await Blog.findOneAndUpdate({ _id: blogId }, { $set: blogData });

    if (path) {
      revalidatePath(path);
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating blog:", error);
    return {
      success: false,
      error: error.message || "Failed to update blog",
    };
  }
}
