"use client";
import useProvider from "@/hooks/useProvider";
import CourseCard from "../shared/CourseCard";
import LoadMore from "../shared/LoadMore";
import EmptyPage from "../shared/NoResult";

export default function CoursesContent({ courses = [], hasNextPage }) {
  const { isGridCol } = useProvider();

  return (
    <section className="w-full">
      <div
        className={`courses col-span-12 grid gap-5 lg:col-span-8 ${
          isGridCol ? "grid-cols-1 gap-5" : "sm:grid-cols-2"
        }`}
      >
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
        {
          courses.length === 0 && <EmptyPage />
        }
      {hasNextPage && <LoadMore />}
    </section>
  );
}
