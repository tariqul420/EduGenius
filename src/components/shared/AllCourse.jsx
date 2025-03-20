'use client'
import FilterItem from "@/app/(root)/courses/FilterItem";
import FilterBar from "../FilterBar";
import useProvider from "@/hooks/useProvider";

export default function AllCourse({children}) {
  const { isGridCol } = useProvider();
  return (
    <section className="py-5">
      <div className="container mx-auto px-2 md:px-5">
        {/* Filter Bar */}
        <FilterBar/>
        {/* Courses Content Section */}
        <div className="mt-6 grid grid-cols-12 gap-5 md:mt-8">
        <div 
        className={`courses col-span-12 grid gap-5 lg:col-span-8 ${
          isGridCol ? "grid-cols-1 gap-5" : "grid-cols-2"}`}>
          {children}
        </div>
        <div className="courses-filter col-span-4 hidden rounded px-4 py-1.5 shadow-md lg:block">
          <FilterItem />
        </div>
      </div>
      </div>
    </section>
  );
}