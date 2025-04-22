"use client";
import CourseCard from "../shared/CourseCard";
import InfiniteScroll from "../shared/InfiniteScroll";
import EmptyPage from "../shared/NoResult";

import useProvider from "@/hooks/useProvider";

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
      {courses.length === 0 && <EmptyPage />}
      <InfiniteScroll
        hasNextPage={hasNextPage}
        noMoreDataText="No more courses"
      />
    </section>
  );
}
