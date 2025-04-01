import CoursesContent from "@/components/course/CoursesContent";
import FilterBar from "@/components/course/FilterBar";
import FilterItem from "@/components/course/FilterItem";
import { getCategory } from "@/lib/actions/category.action";
import { getCourses } from "@/lib/actions/course.action";

export default async function Course({ searchParams }) {
  const categories = await getCategory();
  const { category } = await searchParams;
  const { level } = await searchParams;
  const { search } = await searchParams;
  const { sort } = await searchParams;
  const { page } = await searchParams;

  const {
    courses,
    total,
    hasNextPage = false,
  } = await getCourses({
    categorySlug: category,
    level: level,
    search: search,
    sort: sort,
    page: Number(page) || 1,
    limit: 4,
  });

  return (
    <section className="py-5">
      <div className="container mx-auto px-2 md:px-5 lg:max-w-6xl">
        {/* Filter Bar */}
        <FilterBar total={total} courses={courses} categories={categories} />
        {/* Courses Content Section */}
        <div className="mt-6 grid grid-cols-12 gap-5 md:mt-8">
          <CoursesContent courses={courses} hasNextPage={hasNextPage} />
          <div className="courses-filter col-span-3 hidden rounded px-4 py-1.5 shadow-md lg:block">
            <FilterItem categories={categories} />
          </div>
        </div>
      </div>
    </section>
  );
}
