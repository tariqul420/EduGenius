import { getBlogBySlug } from "@/lib/actions/blog.action";
import { format } from "date-fns";
import { CalendarDays, User, Clock, MessageCircle, ChartColumnStacked } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BlogDetails = async ({ params }) => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  // If blog is not found, display a message
  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <h2 className="text-xl">Blog not found</h2>
      </div>
    );
  }

  const { title, content, thumbnail, createdAt, author, comments, category } = blog || {};

  const uploadDate = createdAt ? format(new Date(createdAt), "MMMM dd, yyyy") : "";

  return (
    <div className="container mx-auto my-10 px-4 py-6 lg:max-w-4xl">
      {/* Go Back Link */}
      <div className="mb-6">
        <Link href="/blog" className="text-primary hover:text-primary-700">
          &larr; Go Back to Blog
        </Link>
      </div>

      {/* Blog Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{title}</h1>

      {/* Author, Published Date, Reading Time and category */}
      <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
        {/* Author */}
        <div className="flex items-center gap-2">
          <User size={18} className="text-gray-500" />
          <Link
            href={`/instructors/${author?.slug}`}
            className="font-semibold text-primary hover:text-primary-700"
          >
            {author?.firstName} {author?.lastName}
          </Link>
        </div>

        {/* Published Date */}
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-gray-500" />
          <span>{uploadDate}</span>
        </div>

        {/* Reading Time */}
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-gray-500" />
          <span>{Math?.ceil(content?.split(" ")?.length / 200)} min read</span>
        </div>

        {/* Comments Count */}
        <div className="flex items-center gap-2">
          <MessageCircle size={18} className="text-gray-500" />
          <span>{comments?.length} comments</span>
        </div>

        {/* category */}
        <div className="flex items-center gap-2">
          <ChartColumnStacked size={18} className="text-gray-500" />
          <span>{category?.name}</span>
        </div>
      </div>

      {/* Thumbnail Image */}
      <div className="w-full rounded-lg overflow-hidden shadow-lg mb-8">
        <Image
          src={thumbnail}
          alt={title}
          width={800}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Blog Content */}
      <div className="prose max-w-none text-gray-800 leading-relaxed mb-8">
        <p>{content}</p>
      </div>

      {/* Author Info Section */}
      <div className="mt-10 p-6 border-t border-gray-200 pt-6 flex items-center gap-4 bg-gray-50 rounded-lg">
        <Image
          src={author.profilePicture}
          alt={author.firstName}
          width={60}
          height={60}
          className="rounded-full border-2 border-white shadow-sm"
        />
        <div>
          <h3 className="font-semibold text-lg">{author?.firstName} {author?.lastName}</h3>
          <p className="text-gray-500">{author?.email}</p>
          <p className="text-sm text-gray-600 mt-1">
            {author?.role === "instructor" ? "Instructor" : "Guest Writer"}
          </p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <MessageCircle size={24} className="text-gray-700" />
          Comments ({comments?.length || 0})
        </h2>
        {comments?.length > 0 ? (
          comments.map((comment) => {
            const userCommentDate = comment?.createdAt
              ? format(new Date(comment.createdAt), "MMMM dd, yyyy")
              : "";

            return (
              <div key={comment?._id} className="mb-4 p-4 border rounded-lg shadow-sm bg-white">
                <div className="flex items-center gap-2">
                  <Image
                    src={comment?.user?.profilePicture}
                    alt={comment?.user?.firstName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {comment?.user?.firstName} {comment?.user?.lastName}
                    </h4>
                    <p className="text-sm text-gray-500">{userCommentDate}</p>
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{comment?.comment}</p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>

    </div>
  );
};

export default BlogDetails;
