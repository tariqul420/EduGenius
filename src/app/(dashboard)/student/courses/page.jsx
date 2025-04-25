import { auth } from "@clerk/nextjs/server";

import CourseCard from "@/components/dashboard/student/CourseCard";
import NoResult from "@/components/shared/NoResult";
import { getCourseForEnrollStudent } from "@/lib/actions/course.action";

export default async function StudentCourse() {
  const { sessionClaims } = await auth();

  const courses = await getCourseForEnrollStudent(sessionClaims?.userId);

  return (
    <section className="min-h-screen py-8">
      <div className="@container/main mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-semibold text-main">
           Learning Dashboard
          </h1>
          <p className="mt-4 max-w-2xl dark:text-light-bg">
            Welcome back! Here are all the courses you&apos;re currently
            enrolled in. Click on any course to resume your learning.
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
