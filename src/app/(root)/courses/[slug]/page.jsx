import PaymentModal from "@/components/payment/PaymentModal";
import { getCourseBySlug, getCourses } from "@/lib/actions/course.action";
import { auth } from "@clerk/nextjs/server";
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
  const { userId, sessionClaims } = await auth();
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
        limit: 4,
        excludeSlug: slug, // Exclude the current course
      });
      relatedCourses = popularCourses;
    }
  } else {
    // If no category slug, fetch top-rated courses, excluding the current course
    const { courses: popularCourses } = await getCourses({
      sort: "top-rated",
      limit: 4,
      excludeSlug: slug, // Exclude the current course
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
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-2 py-10 dark:bg-black">
      <div className="dark:bg-dark-bg container mx-auto max-w-3xl rounded-lg bg-white p-6 px-2.5 shadow-md md:p-10 md:px-8">
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
              <Users size={16} strokeWidth={1} absoluteStrokeWidth /> {students}
            </p>
          </span>
          <span>
            <p className="flex items-center gap-1.5">
              <RefreshCcw size={16} strokeWidth={1} absoluteStrokeWidth /> Last
              Updated Mar 26, 2025
            </p>
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 text-base text-gray-700 sm:grid-cols-2 dark:text-gray-300">
          <p className="flex items-center gap-2">
            <BookOpen size={18} className="text-main-500" />
            <span className="font-medium">Level:</span> {level}
          </p>
          <p className="flex items-center gap-2">
            <Award size={18} className="text-blue-500" />
            <span className="font-medium">Instructor:</span> {instructor?.email}
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
            className="bg-main hover:bg-main mt-5 inline-block rounded px-4 py-1.5 text-white transition-colors"
          >
            Go Back
          </Link>

          {isSignedIn ? (
            <PaymentModal course={course} userId={userId} path={path} />
          ) : (
            <Link
              href={`/sign-in`}
              className="mt-5 inline-block rounded bg-gray-500 px-4 py-1.5 text-white transition-colors hover:bg-gray-600"
            >
              Sign in to Enroll
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
