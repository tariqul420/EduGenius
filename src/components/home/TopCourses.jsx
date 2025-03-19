import Heading from "@/components/shared/Heading";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/Course";
import CourseCard from "../shared/CourseCard";
import TopCoursesBtn from "./TopCoursesBtn";

const TopCourses = async ({ category: slug }) => {
  await dbConnect();
  const categorySlug = slug || "all-courses";

  const query = categorySlug === "all-courses" ? {} : { categorySlug: categorySlug };

  const courseCategory = await Course.aggregate([
    {
      $match: query,
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    {
      $unwind: "$categoryDetails",
    },
    {
      $addFields: {
        averageRating: {
          $cond: {
            if: { $gt: [{ $size: "$ratings" }, 0] },
            then: { $avg: "$ratings.rating" },
            else: 0,
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        price: 1,
        language: 1,
        level: 1,
        thumbnail: 1,
        averageRating: 1,
        slug: 1,
        category: "$categoryDetails.name",
      },
    },
    { $limit: 6 }
  ]);

  return (
    <section className="p-5 container mx-auto lg:max-w-6xl mt-20">
      <Heading title={`Our Top Courses`} subTitle={`We make learning convenient, affordable, and fun!`} />

      {/* Category Buttons */}
      <TopCoursesBtn />

      {/* Course Cards */}
      {
        courseCategory?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {courseCategory.map((course, index) => (
              <div key={index} className="flex flex-col">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
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