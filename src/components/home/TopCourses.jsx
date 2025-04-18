import Heading from "@/components/shared/Heading";
import NoResult from "@/components/shared/NoResult";
import CourseCard from "../shared/CourseCard";
import TopCoursesBtn from "./TopCoursesBtn";

const TopCourses = async ({ courses, categories }) => {
  return (
    <section className="py-5 md:py-8 dark:bg-black">
      <div className="container mx-auto px-5 lg:max-w-6xl">
        <Heading
          title={`Our Top Courses`}
          subTitle={`We make learning convenient, affordable, and fun!`}
        />

        {/* Category Buttons */}
        <TopCoursesBtn categories={categories} />

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
          <div className="mx-auto max-w-4xl">
            <NoResult />
          </div>
        )}
      </div>
    </section>
  );
};

export default TopCourses;
