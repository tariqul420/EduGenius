import CoursesContent from "@/components/course/course-content";
import CourseFilterBar from "@/components/course/course-filter-bar";
import CourseFilterItem from "@/components/course/course-filter-item";
import { getCategory } from "@/lib/actions/category.action";
import { getCourses } from "@/lib/actions/course.action";

export default async function Course({ searchParams }) {
  const categories = await getCategory();
  const { category, level, search, sort, page } = await searchParams;

  // If category then get the category slug
  const categoryParams = category ? category.split(",") : [];

  const {
    courses,
    total,
    hasNextPage = false,
  } = await getCourses({
    categorySlugs: categoryParams,
    level,
    search: search?.trim(),
    sort,
    page: Number(page) || 1,
    limit: 4,
  });

  return (
    <section className="py-5">
      <div className="container mx-auto px-2 md:px-5 lg:max-w-6xl">
        {/* Filter Bar */}
        <div className="bg-white dark:bg-black">
          <CourseFilterBar
            total={total}
            courses={courses}
            categories={categories}
          />
        </div>
        {/* Courses Content Section */}
        <div className="mt-6 flex justify-between gap-5 md:mt-8">
          <CoursesContent courses={courses} hasNextPage={hasNextPage} />
          <div className="courses-filter hidden min-w-[250px] rounded-md bg-white px-4 py-4 shadow-md lg:block dark:bg-black">
            <CourseFilterItem categories={categories} />
          </div>
        </div>
      </div>
    </section>
  );
}
