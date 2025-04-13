import PaymentModal from "@/components/payment/PaymentModal";
import CourseCard from "@/components/shared/CourseCard";
import { getCourseBySlug, getCourses } from "@/lib/actions/course.action";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  BookOpen,
  ChevronRight,
  Clock,
  DollarSign,
  Globe,
  RefreshCcw,
  Star,
  Tag,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseDetails = async ({ params }) => {
  const { sessionClaims } = await auth();
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

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
    level,
    discount,
    price,
    students,
    thumbnail,
    language,
    description,
    category,
    duration,
    averageRating,
    instructor,
  } = course;
  return (
    <>
      <section className="px-2 py-10 md:px-5 dark:bg-black">
        <div className="container mx-auto grid max-w-6xl grid-cols-12 justify-center gap-5 md:gap-4">
          {/* Main Content */}
          <div className="col-span-12 mx-auto h-fit rounded-lg md:w-7/8 lg:col-span-8 lg:w-full">
            <div className="dark:bg-dark-bg bg-light-bg rounded-lg border p-6 px-2.5 shadow-md">
              <Image
                src={thumbnail}
                alt={category?.name}
                width={600}
                height={300}
                className="h-60 w-full rounded object-cover"
              />
              <h1 className="mt-4 text-2xl font-bold">{category.name}</h1>
              <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
                {description}
              </p>
              <div className="mt-2 flex gap-2 text-gray-500 sm:gap-5 dark:text-gray-400">
                <span>
                  <p className="flex items-center gap-1.5">
                    <Star
                      size={16}
                      color="#ffd500"
                      strokeWidth={1}
                      fill="#ffd500"
                      absoluteStrokeWidth
                    />
                    {averageRating}
                  </p>
                </span>
                <span>
                  <p className="flex items-center gap-1.5">
                    <Users size={16} strokeWidth={1} absoluteStrokeWidth />{" "}
                    {students?.length}
                  </p>
                </span>
                <span>
                  <p className="flex items-center gap-1.5">
                    <RefreshCcw size={16} strokeWidth={1} absoluteStrokeWidth />{" "}
                    Last Updated Mar 26, 2025
                  </p>
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 text-base text-gray-700 md:grid-cols-2 dark:text-gray-300">
                <p className="flex items-center gap-2">
                  <BookOpen size={18} className="text-main-500" />
                  <span className="font-medium">Level:</span> {level}
                </p>
                <p className="flex items-center gap-2">
                  <Globe size={18} className="text-purple-500" />
                  <span className="font-medium">Language:</span> {language}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={18} className="text-yellow-500" />
                  <span className="font-medium">Duration:</span> {duration}
                </p>
                <p className="flex items-center gap-2">
                  <DollarSign size={18} className="text-red-500" />
                  <span className="font-medium">Price:</span> {price}
                </p>
                <p className="flex items-center gap-2">
                  <Tag size={18} className="text-pink-500" />
                  <span className="font-medium">Discount:</span> {discount}
                </p>
              </div>

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

            <Link href={`/instructors/${instructor?.slug}`}>
              <div className="group dark:bg-dark-bg relative mt-12 rounded-xl border bg-white p-4 transition-shadow hover:shadow-lg">
                <div className="flex flex-col items-center gap-6 sm:flex-row">
                  <div className="flex-shrink-0">
                    <Image
                      src={instructor?.profilePicture}
                      alt={`${instructor?.firstName} ${instructor?.lastName}`}
                      width={80}
                      height={80}
                      className="rounded-full border-4 object-cover shadow-md"
                    />
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <h2 className="text-dark-bg dark:text-light-bg text-xl font-bold">
                      {instructor?.firstName} {instructor?.lastName}
                    </h2>
                    <p className="dark:text-medium-bg text-gray-600">
                      {instructor?.role === "instructor"
                        ? "Instructor"
                        : "Guest Writer"}
                    </p>
                    <p className="dark:text-medium-bg text-gray-600">
                      {instructor?.bio || instructor?.email}
                    </p>
                    <div className="mt-3 flex justify-center gap-3 sm:justify-start">
                      {/* Social links can be added here */}
                    </div>
                  </div>
                </div>
                {/* Arrow Icon with Animation */}
                <div className="absolute top-1/2 right-4 -translate-y-1/2 transform transition-transform duration-300 group-hover:translate-x-2">
                  <ChevronRight className="dark:text-medium-bg h-6 w-6 text-gray-600" />
                </div>
              </div>
            </Link>
          </div>

          {/* Sidebar */}
          <div className="bg-light-bg col-span-12 mt-10 lg:col-span-4 lg:mt-0 dark:bg-black">
            <div className="dark:bg-dark-bg/50 rounded-xl border p-2 shadow-sm">
              <h2 className="text-dark-bg dark:text-light-bg mb-6 border-b pb-2 text-xl font-bold">
                Recommended Courses
              </h2>
              {/* ================== Recommended Courses Card ===================== */}
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
