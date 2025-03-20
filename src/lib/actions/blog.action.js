import Blog from "@/models/Blog";
import dbConnect from "../dbConnect";

export async function getBlogs({ categorySlug, search, page = 1, limit = 5 } = {}) {
  try {
    await dbConnect();

    const skip = (page - 1) * limit;

    const blogs = await Blog.aggregate([
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
      {
        $lookup: {
          from: "users",
          localField: "blog",
          foreignField: "_id",
          as: "blogDetails",
        },
      },
      { $unwind: "$blogDetails" },
      {
        $project: {
          title: 1,
          description: 1,
          categorySlug: 1,
          thumbnail: 1,
          students: { $size: "$students" },
          blog: {
            name: "$blogDetails.name",
            email: "$blogDetails.email",
          },
        },
      },
      { $skip: skip }, // ✅ Pagination Fix
      { $limit: limit },
    ]);

    const total = await Blog.countDocuments({
      ...(categorySlug && { categorySlug }),
      ...(search && {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { level: { $regex: search, $options: "i" } },
        ],
      }),
    });

    const hasNextPage = total > page * limit;

    return { blogs, total, hasNextPage };
  } catch (error) {
    console.error(error);
  }
}
