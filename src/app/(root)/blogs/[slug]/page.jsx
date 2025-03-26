import { SendComment } from "@/components/shared/SendComment";
import { getBlogBySlug } from "@/lib/actions/blog.action";
import { auth } from '@clerk/nextjs/server';
import { format } from "date-fns";
import { CalendarDays, ChartColumnStacked, Clock, MessageCircle, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BlogDetails = async ({ params }) => {
  const { slug } = await params;
  const { sessionClaims } = await auth()
  const blog = JSON.parse(JSON.stringify(await getBlogBySlug(slug)));

  // If blog is not found, display a message
  if (!blog) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        <h2 className="text-xl">Blog not found</h2>
      </div>
    );
  }

  const { title, content, thumbnail, createdAt, author, comments, category } = blog;

  const uploadDate = format(new Date(createdAt), "MMMM dd, yyyy");

  return (
    <div className="container mx-auto my-10 px-4 py-6 lg:max-w-4xl">
      {/* Go Back Link */}
      <div className="mb-6">
        <Link href="/blog" className="text-main hover:text-main-700">
          &larr; Go Back to Blog
        </Link>
      </div>

      {/* Blog Title */}
      <h1 className="mb-6 text-4xl font-extrabold text-gray-900">{title}</h1>

      {/* Author, Published Date, Reading Time and category */}
      <div className="mb-8 flex flex-wrap items-center gap-4 text-gray-600">
        {/* Author */}
        <div className="flex items-center gap-2">
          <User size={18} className="text-gray-500" />
          <Link
            href={`/instructors/${author?.slug}`}
            className="text-main hover:text-main-700 font-semibold"
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
          <span>{Math.ceil(content?.split(" ")?.length / 200)} min read</span>
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
      <div className="mb-8 w-full overflow-hidden rounded-lg shadow-lg">
        <Image
          src={thumbnail}
          alt={title}
          width={800}
          height={400}
          className="h-auto w-full object-cover"
          priority // Added for above-the-fold images
        />
      </div>

      {/* Blog Content */}
      <div
        className="prose mb-8 max-w-none leading-relaxed text-gray-800"
        dangerouslySetInnerHTML={{ __html: content }} // Changed to render HTML content properly
      />

      {/* Author Info Section */}
      {author && (
        <div className="mt-10 flex items-center gap-4 rounded-lg border-t border-gray-200 bg-gray-50 p-6 pt-6">
          <Image
            src={author.profilePicture}
            alt={`${author.firstName} ${author.lastName}`}
            width={60}
            height={60}
            className="rounded-full border-2 border-white shadow-sm"
          />
          <div>
            <h3 className="text-lg font-semibold">
              {author.firstName} {author.lastName}
            </h3>
            <p className="text-gray-500">{author.email}</p>
            <p className="mt-1 text-sm text-gray-600">
              {author.role === "instructor" ? "Instructor" : "Guest Writer"}
            </p>
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-10">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
          <MessageCircle size={24} className="text-gray-700" />
          Comments ({comments?.length || 0})
        </h2>

        {/* Comments List */}


        {/* Comment Form */}
        <SendComment blogId={blog?._id} userId={sessionClaims?.userId} />
      </div>
    </div>
  );
};

export default BlogDetails;