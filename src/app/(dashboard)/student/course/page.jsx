import CourseCard from "@/components/dashboard/student/CourseCard";
import NoResult from "@/components/shared/NoResult";
import { getCourseForEnrollStudent } from "@/lib/actions/course.action";
import { auth } from "@clerk/nextjs/server";

export default async function StudentCourse() {
  const { sessionClaims } = await auth();

  const courses = await getCourseForEnrollStudent(sessionClaims?.userId);

  return (
    <section className="min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Learning
          </h1>
          <p className="mt-4 max-w-2xl">
            Dive into your learning journey with our curated courses designed to
            help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses?.courses?.length > 0 ? (
            courses?.courses?.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <div className="sm:col-span-2 lg:col-span-3">
              <NoResult />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
