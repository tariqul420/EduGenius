import CoursesContent from "@/components/course/CoursesContent";
import FilterBar from "@/components/FilterBar";
import { getCategory } from "@/lib/actions/category.action";
import { getCourses } from "@/lib/actions/course.action";
import FilterItem from "./FilterItem";

export default async function Course({ searchParams }) {

  const categories = await getCategory()
  const { category } = await searchParams;
  const { level } = await searchParams;
  const { search } = await searchParams;
  const { sort } = await searchParams;

  const { courses } = await getCourses({ categorySlug: category, level: level,search: search, sort: sort });

  return (
    <section className="py-5">
      <div className="container lg:max-w-6xl mx-auto px-2 md:px-5">
        {/* Filter Bar */}
        <FilterBar />
        {/* Courses Content Section */}
        <div className="mt-6 grid grid-cols-12 gap-5 md:mt-8">
          <CoursesContent courses={JSON.parse(JSON.stringify(courses))} />
          <div className="courses-filter col-span-4 hidden rounded px-4 py-1.5 shadow-md lg:block">
            <FilterItem categories={JSON.parse(JSON.stringify(categories))} />
          </div>
        </div>
      </div>
    </section>
  );
}
