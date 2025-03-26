import Heading from "@/components/shared/Heading";
import CourseCard from "../shared/CourseCard";
import TopCoursesBtn from "./TopCoursesBtn";

const TopCourses = async ({ courses }) => {
  return (
    <section className="dark:bg-black py-5 md:py-8">
      <div className="container mx-auto px-5 lg:max-w-6xl">
        <Heading
          title={`Our Top Courses`}
          subTitle={`We make learning convenient, affordable, and fun!`}
        />

        {/* Category Buttons */}
        <TopCoursesBtn />

        {/* Course Cards */}
        {courses?.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <div key={index} className="flex flex-col">
                <CourseCard
                  key={index}
                  course={JSON.parse(JSON.stringify(course))}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
              No courses found in this category!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopCourses;
