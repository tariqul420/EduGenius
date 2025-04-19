import ReviewCard from "@/components/course/ReviewCard";
import PaymentModal from "@/components/payment/PaymentModal";
import CourseCard from "@/components/shared/CourseCard";
import LoadMore from "@/components/shared/LoadMore";
import { getCourseBySlug, getCourses } from "@/lib/actions/course.action";
import { getSingleCourseReview } from "@/lib/actions/review.action";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  BookOpen,
  ChevronRight,
  Clock,
  DollarSign,
  Globe,
  MessageCircle,
  RefreshCcw,
  Star,
  Tag,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CoursesTab from "../../../../components/course/CoursesTab";

const CourseDetails = async ({ params, searchParams }) => {
  const { sessionClaims } = await auth();
  const { page } = await searchParams;
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  const {
    reviews = [],
    hasNextPage = false,
    total = 0,
  } = await getSingleCourseReview({
    course: course?._id,
    page: Number(page) || 1,
    limit: 10,
  });

  // Get the category slug of the current course
  const categorySlug = course?.category?.slug;

  let relatedCourses = [];

  if (categorySlug) {
    // Fetch courses with the same category slug, excluding the current course
    const { courses } = await getCourses({
      categorySlugs: [categorySlug],
      limit: 4,
      excludeSlug: slug, // Exclude the current course
    });

    relatedCourses = courses;

    // Fallback to top-rated courses if no related courses are found
    if (!relatedCourses || relatedCourses.length === 0) {
      const { courses: popularCourses } = await getCourses({
        sort: "top-rated",
        limit: 2,
        excludeSlug: slug,
      });
      relatedCourses = popularCourses;
    }
  } else {
    const { courses: popularCourses } = await getCourses({
      sort: "top-rated",
      limit: 2,
      excludeSlug: slug,
    });
    relatedCourses = popularCourses;
  }

  const {
    thumbnail,
    category,
    instructor,
  } = course;
  return (
    <>
      <section className="px-2 py-10 md:px-5 dark:bg-black">
        <div className="container mx-auto grid max-w-6xl grid-cols-12 justify-center gap-5 md:gap-4">
          {/* Main Content */}
          <div className="col-span-12 mx-auto h-fit rounded-lg md:w-7/8 lg:col-span-8 lg:w-full">
            {/* Course Details Card */}
            <div className="dark:bg-dark-bg bg-light-bg rounded-lg border p-6 px-2.5 shadow-md">
              <Image
                src={thumbnail}
                alt={category?.name}
                width={600}
                height={500}
                className="h-[300px] w-full rounded object-cover"
              />
              <div className="flex items-center justify-between">
                <Link
                  href={`/courses`}
                  className="bg-main hover:bg-dark-main mt-5 inline-block rounded px-4 py-1.5 text-white transition-colors"
                >
                  Go Back
                </Link>

                <SignedIn>
                  <PaymentModal course={course} user={sessionClaims} />
                </SignedIn>
                <SignedOut>
                  <Link
                    href={`/sign-in`}
                    className="bg-main hover:bg-dark-main mt-5 inline-block cursor-pointer rounded px-4 py-1.5 text-white transition-colors"
                  >
                    Sign in to Enroll
                  </Link>
                </SignedOut>
              </div>
            </div>

            <CoursesTab course={course} instructor={instructor} />

            {/* Student Review Section with enhanced UI */}
            {total > 0 && (
              <div className="mt-14">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-dark-bg dark:text-light-bg flex items-center gap-2 text-2xl font-bold">
                    <MessageCircle
                      size={24}
                      className="text-main dark:text-dark-btn"
                    />
                    Student Review ({total || 0})
                  </h2>
                  <p>
                    Show {reviews?.length} of {total} Result
                  </p>
                </div>
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="dark:bg-dark-bg relative rounded-lg border bg-white p-5 shadow transition-shadow duration-200 hover:shadow-md"
                    >
                      <ReviewCard review={review} />
                    </div>
                  ))}

                  {hasNextPage && <LoadMore />}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="bg-light-bg col-span-12 mt-10 lg:col-span-4 lg:mt-0 dark:bg-black">
            <div className="dark:bg-dark-bg/50 rounded-xl border p-2 shadow-sm">
              <h2 className="text-dark-bg dark:text-light-bg mb-6 border-b pb-2 text-xl font-bold">
                Recommended Courses
              </h2>
              {/* Recommended Courses Card  */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {relatedCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseDetails;
