// import PaymentModal from "@/components/payment/PaymentModal";
// import { getCourseBySlug } from "@/lib/actions/course.action";
// import { auth } from "@clerk/nextjs/server";
// import {
//   Award,
//   BookOpen,
//   Clock,
//   DollarSign,
//   Globe,
//   RefreshCcw,
//   Star,
//   Tag,
//   Users,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// const CourseDetails = async ({ params }) => {
//   const { userId, sessionClaims } = await auth();
//   const { slug } = await params;
//   const course = await getCourseBySlug(slug);
//   const path = `/courses/${slug}`;

//   const {
//     level,
//     discount,
//     price,
//     students,
//     thumbnail,
//     language,
//     description,
//     category,
//     duration,
//     averageRating,
//     instructor,
//   } = course;

//   const isSignedIn = !!userId;

//   return (
//     <section className="flex min-h-screen flex-col px-2 items-center justify-center bg-gray-50 py-10 dark:bg-black">
//       <div className="dark:bg-dark-bg container mx-auto max-w-3xl rounded-lg bg-white p-6 px-2.5 shadow-md md:p-10 md:px-8">
//         <Image
//           src={thumbnail}
//           alt={category?.name}
//           width={600}
//           height={300}
//           className="h-60 w-full rounded object-cover"
//         />
//         <h1 className="mt-4 text-2xl font-bold">{category.name}</h1>
//         <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
//           {description}
//         </p>
//         <div className="mt-2 flex gap-2 text-gray-500 sm:gap-5 dark:text-gray-400">
//           <span>
//             <p className="flex items-center gap-1.5">
//               <Star
//                 size={16}
//                 color="#ffd500"
//                 strokeWidth={1}
//                 fill="#ffd500"
//                 absoluteStrokeWidth
//               />
//               {averageRating}
//             </p>
//           </span>
//           <span>
//             <p className="flex items-center gap-1.5">
//               <Users size={16} strokeWidth={1} absoluteStrokeWidth /> {students}
//             </p>
//           </span>
//           <span>
//             <p className="flex items-center gap-1.5">
//               <RefreshCcw size={16} strokeWidth={1} absoluteStrokeWidth /> Last
//               Updated Mar 26, 2025
//             </p>
//           </span>
//         </div>

//         <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 text-base text-gray-700 sm:grid-cols-2 dark:text-gray-300">
//           <p className="flex items-center gap-2">
//             <BookOpen size={18} className="text-main-500" />
//             <span className="font-medium">Level:</span> {level}
//           </p>
//           <p className="flex items-center gap-2">
//             <Award size={18} className="text-blue-500" />
//             <span className="font-medium">Instructor:</span> {instructor?.email}
//           </p>
//           <p className="flex items-center gap-2">
//             <Globe size={18} className="text-purple-500" />
//             <span className="font-medium">Language:</span> {language}
//           </p>
//           <p className="flex items-center gap-2">
//             <Clock size={18} className="text-yellow-500" />
//             <span className="font-medium">Duration:</span> {duration}
//           </p>
//           <p className="flex items-center gap-2">
//             <DollarSign size={18} className="text-red-500" />
//             <span className="font-medium">Price:</span> {price}
//           </p>
//           <p className="flex items-center gap-2">
//             <Tag size={18} className="text-pink-500" />
//             <span className="font-medium">Discount:</span> {discount}
//           </p>
//         </div>

//         <div className="flex items-center justify-between">
//           <Link
//             href={`/courses`}
//             className="bg-main hover:bg-main mt-5 inline-block rounded px-4 py-1.5 text-white transition-colors"
//           >
//             Go Back
//           </Link>

//           {isSignedIn ? (
//             <PaymentModal course={course} userId={userId} path={path} />
//           ) : (
//             <Link
//               href={`/sign-in`}
//               className="mt-5 inline-block rounded bg-gray-500 px-4 py-1.5 text-white transition-colors hover:bg-gray-600"
//             >
//               Sign in to Enroll
//             </Link>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CourseDetails;


import InsightsCard from "@/components/home/InsightsCard";
import CommentCard from "@/components/shared/CommentCard";
import LoadMore from "@/components/shared/LoadMore";
import { SendComment } from "@/components/shared/SendComment";
import { getBlogBySlug, getBlogs } from "@/lib/actions/blog.action";
import { getCommentsByBlogId } from "@/lib/actions/comment.action";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import {
  ArrowLeft,
  CalendarDays,
  ChartColumnStacked,
  Clock,
  MessageCircle,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BlogDetails = async ({ params, searchParams }) => {
  const { slug } = await params;
  const { page } = await searchParams;
  const { sessionClaims } = await auth();
  const blog = await getBlogBySlug(slug);
  const { blogs: featuredBlog } = await getBlogs({ sort: "popular", limit: 4 });

  const commentsResult = await getCommentsByBlogId({
    blogId: blog?._id,
    page: Number(page) || 1,
    limit: 3,
  });

  const comments = commentsResult?.comments || [];
  const total = commentsResult?.total || 0;
  const hasNextPage = commentsResult?.hasNextPage || false;

  if (!blog) {
    return (
      <div className="dark:text-light-bg flex h-screen items-center justify-center text-gray-500">
        <h2 className="text-xl">Blog not found</h2>
      </div>
    );
  }

  const { title, content, thumbnail, createdAt, author, category } = blog || {};
  const uploadDate = format(new Date(createdAt), "MMMM dd, yyyy");

  return (
    <section className="mx-auto lg:max-w-6xl py-8 md:py-12">
      <div className="dark:text-light-bg container px-4  lg:max-w-7xl">
        {/* Go Back Link with better styling */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="dark:text-light-bg hover:text-main-700 inline-flex items-center transition-colors duration-200"
          >
            <ArrowLeft />
            Back to Blog
          </Link>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Blog Header Section */}
            <div className="mb-10">
              <h1 className="dark:text-light-bg mb-6 text-4xl leading-tight font-bold">
                {title}
              </h1>

              {/* Author and Metadata */}
              <div className="dark:text-medium-bg mb-8 flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <Link
                    href={`/instructors/${author?.slug}`}
                    className="text-main dark:text-dark-btn hover:text-main-700 font-medium hover:underline"
                  >
                    {author?.firstName} {author?.lastName}
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={18} />
                  <span>{uploadDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>
                    {Math.ceil(content?.split(" ")?.length / 200)} min read
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MessageCircle size={18} />
                  <span>{total} comments</span>
                </div>

                <div className="flex items-center gap-2">
                  <ChartColumnStacked size={18} />
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
                  className="aspect-video h-auto w-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Blog Content with improved typography */}
            <div
              className="prose prose-lg dark:text-medium-bg mb-12 max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: content }}
            >
              {/* Your content will be rendered here */}
            </div>

            {/* Author Info Section with better design */}
            {author && (
              <div className="dark:bg-dark-bg mt-12 rounded-xl border bg-white p-4">
                <div className="flex flex-col items-center gap-6 sm:flex-row">
                  <div className="flex-shrink-0">
                    <Image
                      src={author.profilePicture}
                      alt={`${author.firstName} ${author.lastName}`}
                      width={80}
                      height={80}
                      className="rounded-full border-4 object-cover shadow-md"
                    />
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <h3 className="text-dark-bg dark:text-light-bg text-xl font-bold">
                      {author?.firstName} {author?.lastName}
                    </h3>
                    <p className="dark:text-medium-bg text-gray-600">
                      {author.role === "instructor"
                        ? "Instructor"
                        : "Guest Writer"}
                    </p>
                    <p className="dark:text-medium-bg text-gray-600">
                      {author?.bio || author?.email}
                    </p>
                    <div className="mt-3 flex justify-center gap-3 sm:justify-start">
                      {/* Social links can be added here */}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Comments Section with enhanced UI */}
            <div className="mt-14">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-dark-bg dark:text-light-bg flex items-center gap-2 text-2xl font-bold">
                  <MessageCircle
                    size={24}
                    className="text-main dark:text-dark-btn"
                  />
                  Comments ({total || 0})
                </h2>
                <p>
                  Show {comments?.length} of {total} Result
                </p>
              </div>

              {total > 0 ? (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="dark:bg-dark-bg relative rounded-lg border bg-white p-5 shadow transition-shadow duration-200 hover:shadow-md"
                    >
                      <CommentCard comment={comment} path={`/blogs/${slug}`} />
                    </div>
                  ))}

                  {hasNextPage && <LoadMore />}
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed py-8 text-center">
                  <MessageCircle
                    size={48}
                    className="mx-auto mb-3 text-gray-300"
                  />
                  <p className="text-dark-bg dark:text-light-bg">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                </div>
              )}

              {/* Comment Form Section */}
              <div className="mt-10">
                <SendComment
                  blogId={blog?._id}
                  userId={sessionClaims?.userId}
                  slug={slug}
                />
              </div>
            </div>
          </div>

          {/* Sidebar with Featured Blogs */}
          <div className="mt-10 lg:mt-0 lg:w-1/3">
            <div className="sticky top-6 space-y-8">
              {/* Featured Blogs Section */}
              <div className="dark:bg-dark-bg/50 q bg-light-bg rounded-xl border p-6 shadow-sm">
                <h2 className="text-dark-bg dark:text-light-bg mb-6 border-b pb-2 text-xl font-bold">
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
                    <p className="text-dark-bg dark:text-light-bg py-4 text-center">
                      No popular blogs found
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
