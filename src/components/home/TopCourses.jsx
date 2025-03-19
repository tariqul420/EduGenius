import Heading from "@/components/shared/Heading";
import Course from "@/models/Course";
import CourseCard from "../shared/CourseCard";
import TopCoursesBtn from "./TopCoursesBtn";

const TopCourses = async ({ category: slug }) => {

  const categorySlug = slug || "all-courses";

  const query = categorySlug === "all-courses" ? {} : { categorySlug: categorySlug };

  const courseCategory = await Course.find(query);

  return (
    <section className="p-5 container mx-auto lg:max-w-6xl mt-20">
      <Heading title={`Our Top Courses`} subTitle={`We make learning convenient, affordable, and fun!`} />

      {/* Category Buttons */}
      <TopCoursesBtn />

      {/* Course Cards */}
      {
        courseCategory?.length > 0 ? () => {
          return (
            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
              {courseCategory.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          );
        }
          : (
            <div className="flex items-center justify-center h-96">
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                No courses found in this category!
              </p>
            </div>
          )
      }
    </section>
  );
};

export default TopCourses;