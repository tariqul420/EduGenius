import PaymentModal from "@/components/payment/PaymentModal";
import CourseCard from "@/components/shared/CourseCard";
import { getCourseBySlug, getCourses } from "@/lib/actions/course.action";
import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import {
  Award,
  BookOpen,
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
  const { sessionClaims} = await auth()
  const userId = sessionClaims?.userId
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  const path = `/courses/${slug}`;

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

  // console.log(relatedCourses);
  // console.log("single course", course);

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

  const isSignedIn = !!userId;

  return (
    <>
      <section className="dark:bg-black px-2 md:px-5 py-10">
      <div className="grid container mx-auto gap-5 md:gap-4 max-w-6xl grid-cols-12 justify-center">
        {/* Main Content */}
        <div className="dark:bg-dark-bg  col-span-12 rounded-lg bg-light-bg p-6 px-2.5 shadow-md md:w-4/5 mx-auto lg:w-full border lg:col-span-8">
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
                {students}
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
              <Award size={18} className="text-blue-500" />
              <span className="font-medium">Instructor:</span>{" "}
              {instructor?.email}
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
              className="bg-main hover:bg-dark-main  mt-5 inline-block rounded px-4 py-1.5 text-white transition-colors"
            >
              Go Back
            </Link>

            <SignedIn>
            <PaymentModal course={course} userId={userId} path={path} />
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
        {/* Sidebar */}
        <div className="col-span-12 mt-10 lg:col-span-4 lg:mt-0">
          <div className="dark:bg-dark-bg/50 rounded-xl border p-6 shadow-sm">
            <h2 className="text-dark-bg dark:text-light-bg mb-6 border-b pb-2 text-xl font-bold">
              Recomended Courses
            </h2>
            {/* ================== Recomended Courses Card ===================== */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-1">
            {
              relatedCourses.map((course)=> (
                <CourseCard key={course._id} course={course} />
              ))
            }
            </div>

            {/* <div className="space-y-5">
             {featuredBlog?.length > 0 ? (
            featuredBlog.map((blog) => (
            <div key={blog?.slug} className="group">
              <CourseCard
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
      </div> */}
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default CourseDetails;
