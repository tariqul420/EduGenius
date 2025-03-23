import { getBlogBySlug } from "@/lib/actions/blog.action";
import { CalendarDays, User, Clock, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BlogDetails = async ({ params }) => {
  const { slug } = params;
  const blog = await getBlogBySlug(slug);

  // If blog is not found, display a message
  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <h2 className="text-xl">Blog not found</h2>
      </div>
    );
  }

  const { title, content, thumbnail, createdAt, author, comments } = blog;

  return (
    <div className="container mx-auto my-10 px-4 py-6 lg:max-w-4xl">
      {/* Go Back Link */}
      <div className="mb-6">
        <Link href="/blog" className="text-blue-600 hover:text-blue-800">
          &larr; Go Back to Blog
        </Link>
      </div>

      {/* Blog Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{title}</h1>

      {/* Author, Published Date, and Reading Time */}
      <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
        {/* Author */}
        <div className="flex items-center gap-2">
          <User size={18} className="text-gray-500" />
          <Link
            href={`/author/${author.slug}`}
            className="font-semibold text-blue-600 hover:text-blue-800"
          >
            {author.firstName} {author.lastName}
          </Link>
        </div>

        {/* Published Date */}
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-gray-500" />
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>

        {/* Reading Time */}
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-gray-500" />
          <span>{Math.ceil(content.split(" ").length / 200)} min read</span>
        </div>

        {/* Comments Count */}
        <div className="flex items-center gap-2">
          <MessageCircle size={18} className="text-gray-500" />
          <span>{comments.length} comments</span>
        </div>
      </div>

      {/* Thumbnail Image */}
      <div className="w-full rounded-lg overflow-hidden shadow-lg mb-8">
        <Image
          src={thumbnail}
          alt="Blog Thumbnail"
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
          <h3 className="font-semibold text-lg">{author.firstName} {author.lastName}</h3>
          <p className="text-gray-500">{author.email}</p>
          <p className="text-sm text-gray-600 mt-1">
            {author.role === "instructor" ? "Instructor" : "Guest Writer"}
          </p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <MessageCircle size={24} className="text-gray-700" />
          Comments ({comments.length})
        </h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="mb-4 p-4 border rounded-lg shadow-sm bg-white">
              <div className="flex items-center gap-2">
                <Image
                  src={comment.user.profilePicture}
                  alt={comment.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{comment.user.name}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-gray-700">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
