// components/TopCourses.js
import Heading from "@/components/shared/Heading";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import TopCoursesBtn from "./TopCoursesBtn";

const TopCourses = async ({ searchParams }) => {
  await dbConnect();

  // Debug: Log searchParams to verify its contents
  console.log("searchParams:", searchParams);

  // Decode the URL parameter to match the MongoDB value
  const categorySlug = searchParams?.category ? decodeURIComponent(searchParams.category) : "All Courses";

  // Debug: Log the decoded categorySlug
  console.log("categorySlug:", categorySlug);

  // Build the query based on the decoded category
  const query = categorySlug === "All Courses" ? {} : { category: categorySlug };

  // Fetch courses based on the query
  const courseCategory = await Course.find(query);

  return (
    <section className="p-5 container mx-auto lg:max-w-6xl mt-20">
      <Heading title={`Our Top Courses`} subTitle={`We make learning convenient, affordable, and fun!`} />

      {/* Category Buttons */}
      <TopCoursesBtn />

      {/* Course Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {courseCategory?.length > 0 ? (
          courseCategory?.map((course, index) => (
            <p key={index}>Category: {course?.category}</p>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No courses available for this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default TopCourses;