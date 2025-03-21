import CheckCategory from "@/components/shared/CheckCategory";
import { getBlogs } from "@/lib/actions/blog.action";
import { getCategory } from "@/lib/actions/category.action";
import { formatDate } from "@/lib/utils";
import { Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BlogDetails = async ({ searchParams }) => {
  const { category } = await searchParams;

  const categoryParams = category || "";

  const data = await getBlogs({ categories: categoryParams.split(",") });
  const categories = await getCategory();

  const blogs = data.blogs || [];
  const total = data.total || 0;
  const hasNextPage = data.hasNextPage || false;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8 items-center text-center md:flex">
        <h1 className="text-3xl font-semibold">All Posts</h1>
        <p className="text-gray-600 md:ml-80">
          Showing {blogs.length} results of {total}
        </p>
      </div>
      <hr className="mb-8 border-t-2 border-gray-500" />
      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Blog Posts Section */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {blogs.length > 0 &&
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="dark:bg-black-light overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:shadow-xl"
                >
                  <Image
                    src={blog?.thumbnail}
                    alt={blog?.title}
                    width={400}
                    height={200}
                    className="w-full object-cover"
                  />
                  <div className="space-y-2 p-4">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {blog?.category?.name}
                      </p>
                      <p className="bg-green rounded-md p-2 text-sm">
                        {formatDate(blog.createdAt)}
                      </p>
                    </div>

                    <h2 className="text-lg font-semibold">{blog.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {blog.content.slice(0, 100)}...
                    </p>
                  </div>
                  <div className="flex items-center justify-between px-4 pb-4">
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-300">
                      <Mail />
                      <p>{blog.comments && blog.comments.length}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-300">
                      <User />
                      <p>
                        by {blog.author.firstName} {blog.author.lastName}
                      </p>
                    </div>
                    <Link
                      href={`/blog/${blog.id}`}
                      className="text-green font-semibold hover:underline"
                    >
                      {blog.detailButton}
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Sidebar (Categories) */}
        <div className="rounded-lg p-6 md:col-span-1">
          <h2 className="mb-4 text-2xl font-semibold">All Categories</h2>

          <div className="flex flex-col gap-5">
            <CheckCategory
              data={JSON.parse(JSON.stringify(categories))}
              keyCategory="category"
            />
          </div>
          {/* 
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <CheckCategory
                id="webDesign"
                label="Web Design"
                keyCategory="category"
              />
            </li>
            <li className="flex items-center gap-2">
              <CheckCategory
                id="webDevelopment"
                label="Web Development"
                keyCategory="category"
              />
            </li>
            <li className="flex items-center gap-2">
              <CheckCategory
                id="flutter"
                label="Flutter"
                keyCategory="category"
              />
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
