import InsightsCard from "@/components/home/InsightsCard";
import { SendComment } from "@/components/shared/SendComment";
import { getBlogBySlug, getBlogs } from "@/lib/actions/blog.action";
import { getCommentsByBlogId } from "@/lib/actions/comment.action";
import { auth } from '@clerk/nextjs/server';
import { format } from "date-fns";
import { ArrowLeft, CalendarDays, ChartColumnStacked, Clock, MessageCircle, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BlogDetails = async ({ params }) => {
  const { slug } = params; // Removed unnecessary await
  const { sessionClaims } = auth(); // Removed unnecessary await
  const blog = JSON.parse(JSON.stringify(await getBlogBySlug(slug)));
  const { blogs: featuredBlog } = JSON.parse(JSON.stringify(await getBlogs({ sort: "popular", limit: 6 })));
  const comments = JSON.parse(JSON.stringify(await getCommentsByBlogId(blog?._id)));

  if (!blog) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        <h2 className="text-xl">Blog not found</h2>
      </div>
    );
  }

  const { title, content, thumbnail, createdAt, author, category } = blog || {};
  const uploadDate = format(new Date(createdAt), "MMMM dd, yyyy");

  return (
    <div className="container mx-auto px-4 py-8 lg:max-w-7xl">
      {/* Go Back Link with better styling */}
      <div className="mb-8">
        <Link
          href="/blogs"
          className="inline-flex items-center text-main hover:text-main-700 transition-colors duration-200"
        >
          <ArrowLeft />
          Back to Blog
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          {/* Blog Header Section */}
          <div className="mb-10">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 leading-tight">{title}</h1>

            {/* Author and Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <User size={18} className="text-gray-500" />
                <Link
                  href={`/instructors/${author?.slug}`}
                  className="text-main hover:text-main-700 font-medium hover:underline"
                >
                  {author?.firstName} {author?.lastName}
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="text-gray-500" />
                <span>{uploadDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={18} className="text-gray-500" />
                <span>{Math.ceil(content?.split(" ")?.length / 200)} min read</span>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle size={18} className="text-gray-500" />
                <span>{comments?.length} comments</span>
              </div>

              <div className="flex items-center gap-2">
                <ChartColumnStacked size={18} className="text-gray-500" />
                <span>{category?.name}</span>
              </div>
            </div>

            {/* Thumbnail Image with better styling */}
            <div className="mb-10 w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <Image
                src={thumbnail}
                alt={title}
                width={1200}
                height={630}
                className="h-auto w-full object-cover aspect-video"
                priority
              />
            </div>
          </div>

          {/* Blog Content with improved typography */}
          <div
            className="prose prose-lg max-w-none mb-12 text-gray-700"
            dangerouslySetInnerHTML={{ __html: content }}
          >
            {/* Your content will be rendered here */}
          </div>

          {/* Author Info Section with better design */}
          {author && (
            <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src={author.profilePicture}
                    alt={`${author.firstName} ${author.lastName}`}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-white shadow-md"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-gray-900">
                    {author.firstName} {author.lastName}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {author.role === "instructor" ? "Instructor" : "Guest Writer"}
                  </p>
                  <p className="text-gray-500 mt-2">{author.bio || author.email}</p>
                  <div className="mt-3 flex justify-center sm:justify-start gap-3">
                    {/* Social links can be added here */}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comments Section with enhanced UI */}
          <div className="mt-14">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <MessageCircle size={24} className="text-main" />
                Comments ({comments?.length || 0})
              </h2>
            </div>

            {comments?.length > 0 ? (
              <div className="space-y-6">
                {comments.map((comment) => {
                  const userCommentDate = format(new Date(comment.createdAt), "MMMM dd, yyyy");

                  return (
                    <div
                      key={comment._id}
                      className="p-5 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <Image
                          src={comment.user?.profilePicture}
                          alt={`${comment.user?.firstName} ${comment.user?.lastName}`}
                          width={48}
                          height={48}
                          className="rounded-full flex-shrink-0"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-semibold text-gray-900">
                              {comment.user?.firstName} {comment.user?.lastName}
                            </h4>
                            <span className="text-xs text-gray-500">•</span>
                            <p className="text-sm text-gray-500">{userCommentDate}</p>
                          </div>
                          <p className="mt-2 text-gray-700">{comment.comment}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                <MessageCircle size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            )}

            {/* Comment Form Section */}
            <div className="mt-10">
              <SendComment blogId={blog?._id} userId={sessionClaims?.userId} />
            </div>
          </div>
        </div>

        {/* Sidebar with Featured Blogs */}
        <div className="lg:w-1/3 mt-10 lg:mt-0">
          <div className="sticky top-6 space-y-8">
            {/* Featured Blogs Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Popular Blogs
              </h2>
              <div className="space-y-5">
                {featuredBlog?.length > 0 ? (
                  featuredBlog.map((blog) => (
                    <div key={blog?.slug} className="group">
                      <InsightsCard
                        insights={blog}
                        className="transition-all duration-200 group-hover:scale-[1.02]"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No popular blogs found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;