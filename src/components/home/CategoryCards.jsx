"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { FaStar, FaFileAlt, FaUser } from "react-icons/fa";
import { courses } from "@/constant";

const CategoryCards = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const category = searchParams.get("category") || "All Courses";

  const categories = [
    "All Courses",
    "Web Development",
    "Finance & Accounting",
    "Flutter",
    "Web Design",
    "Cybersecurity",
    "Marketing",
    "Data Science",
    "Business Management",
  ];

  // Function to update category in URL
  const updateCategory = (selectedCategory) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (selectedCategory === "All Courses") {
      newParams.delete("category");
    } else {
      newParams.set("category", selectedCategory);
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  // Filter courses based on selected category
  const filteredCourses =
    category === "All Courses"
      ? courses
      : courses.filter((course) => course.course_category === category);

  return (
    <section className="p-5 container mx-auto lg:max-w-6xl mt-20">
      <h1 className="text-center font-bold text-3xl">Our Top Courses</h1>
      <p className="text-center text-sm">
        We make learning convenient, affordable, and fun!
      </p>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center my-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => updateCategory(cat)}
            className={`px-4 py-4 text-sm font-semibold cursor-pointer transition ${category === cat
              ? "bg-green text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Course Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {filteredCourses?.length > 0 ? (
          filteredCourses?.map((course, index) => (
            <div key={index} className="max-w-sm shadow-lg bg-white relative">
              <div className="absolute bg-green text-white text-xs font-semibold px-3 py-1 top-3 left-3">
                {course.course_category}
              </div>

              <Image
                src={course.course_img}
                alt={course.course_title}
                width={500}
                height={300}
              />

              <div>
                <div className="absolute right-6 -mt-9">
                  <div className="bg-black text-white text-xs px-3 py-2 flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{course.rating.toFixed(1)}</span>
                  </div>
                </div>

                <h2 className="text-lg font-semibold mt-4 px-4">
                  {course.course_title}
                </h2>

                <div className="flex items-center text-gray-600 text-sm gap-4 mt-4 px-4">
                  <div className="flex items-center gap-1">
                    <FaFileAlt /> <span>{course.lessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUser /> <span>{course.enrollment_number} Enrolled</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between bg-[#f8f8f8] p-4">
                  <span className="text-gree text-xl font-bold">
                    ${course.price.toFixed(2)}
                  </span>
                  <button className="bg-green text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition">
                    Details
                  </button>
                </div>
              </div>
            </div>
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

export default CategoryCards;
