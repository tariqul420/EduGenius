import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

import CoursesTab from "../../../../components/course/CoursesTab";

import CourseVideo from "@/components/course/course-video";
import PaymentModal from "@/components/payment/payment-modal";
import CourseCard from "@/components/shared/CourseCard";
import { getCourseBySlug, getCourses } from "@/lib/actions/course.action";

const CourseDetails = async ({ params, searchParams }) => {
  const { sessionClaims } = await auth();
  const { page } = await searchParams;
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

  const { instructor } = course;
  return (
    <>
      <section className="px-2 py-10 md:px-5 dark:bg-black">
        <div className="container mx-auto grid max-w-6xl grid-cols-12 justify-center gap-5 md:gap-4">
          {/* Main Content */}
          <div className="col-span-12 mx-auto h-fit rounded-lg md:w-7/8 lg:col-span-8 lg:w-full">
            {/* Course Details Card */}
            <div className="dark:bg-dark-bg bg-light-bg rounded-lg border p-6 px-2.5 shadow-md">
              <CourseVideo course={course} />

              <div className="flex items-center justify-between">
                <Link
                  href={"/courses"}
                  className="bg-main hover:bg-dark-main mt-5 inline-block rounded px-4 py-1.5 text-white transition-colors"
                >
                  Go Back
                </Link>

                <SignedIn>
                  <PaymentModal course={course} user={sessionClaims} />
                </SignedIn>
                <SignedOut>
                  <Link
                    href={"/sign-in"}
                    className="bg-main hover:bg-dark-main mt-5 inline-block cursor-pointer rounded px-4 py-1.5 text-white transition-colors"
                  >
                    Sign in to Enroll
                  </Link>
                </SignedOut>
              </div>
            </div>

            <CoursesTab page={page} course={course} instructor={instructor} />
          </div>

          {/* Sidebar */}
          <div className="col-span-12 mt-10 overflow-hidden lg:col-span-4 lg:mt-0 dark:bg-black">
            <div className="dark:bg-dark-bg/50 min-h-full rounded-xl border p-2 shadow-sm">
              <h2 className="text-dark-bg dark:text-light-bg mx-auto mb-6 w-fit border-b pb-2 text-xl font-bold">
                Recommended Courses
              </h2>
              {/* Recommended Courses Card  */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {relatedCourses.map((SingleCourse) => (
                  <CourseCard key={SingleCourse._id} course={SingleCourse} />
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
