"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

import FilterItem from "@/app/(root)/courses/FilterItem";
import CourseCard from "@/components/shared/CourseCard";
import { LayoutGrid, LayoutList, Search, TableOfContents } from "lucide-react";

const coursesData = [
  {
    _id: "1",
    title: "Machine Learning A-Z",
    description: "Learn machine learning from scratch with hands-on projects.",
    instructor: { name: "Sarah Lee" },
    categorySlug: "machine-learning",
    thumbnail: "https://faculty.spagreen.net/demo/public/images/20231111124240image_402x248-483.png",
    language: "English",
    level: "Advanced",
    discount: 25,
    price: 400,
    duration: 60,
    averageRating: 4.85,
    students: 2,
  },
  {
    _id: "2",
    title: "Full-Stack Web Development",
    description: "Master front-end and back-end web development.",
    instructor: { name: "John Doe" },
    categorySlug: "web-development",
    thumbnail: "https://faculty.spagreen.net/demo/public/images/20231111124240image_402x248-483.png",
    language: "English",
    level: "Intermediate",
    discount: 20,
    price: 350,
    duration: 75,
    averageRating: 4.7,
    students: 5,
  },
  {
    _id: "3",
    title: "Data Science Essentials",
    description: "An introduction to data science techniques and tools.",
    instructor: { name: "Jane Smith" },
    categorySlug: "data-science",
    thumbnail: "https://faculty.spagreen.net/demo/public/images/20231111124240image_402x248-483.png",
    language: "English",
    level: "Beginner",
    discount: 30,
    price: 300,
    duration: 50,
    averageRating: 4.6,
    students: 3,
  },
  {
    _id: "4",
    title: "Graphic Design Mastery",
    description: "Master the art of graphic design with industry tools.",
    instructor: { name: "Emily Johnson" },
    categorySlug: "graphic-design",
    thumbnail: "https://faculty.spagreen.net/demo/public/images/20231111124240image_402x248-483.png",
    language: "English",
    level: "Intermediate",
    discount: 15,
    price: 250,
    duration: 40,
    averageRating: 4.3,
    students: 4,
  },
  {
    _id: "5",
    title: "Cybersecurity Fundamentals",
    description: "Learn essential cybersecurity skills and best practices.",
    instructor: { name: "Michael Brown" },
    categorySlug: "cybersecurity",
    thumbnail: "https://faculty.spagreen.net/demo/public/images/20231111124240image_402x248-483.png",
    language: "English",
    level: "Advanced",
    discount: 10,
    price: 500,
    duration: 80,
    averageRating: 4.9,
    students: 6,
  },
  {
    _id: "6",
    title: "Digital Marketing Strategy",
    description: "Boost your marketing skills with modern digital strategies.",
    instructor: { name: "David Wilson" },
    categorySlug: "digital-marketing",
    thumbnail: "https://faculty.spagreen.net/demo/public/images/20231111124240image_402x248-483.png",
    language: "English",
    level: "Beginner",
    discount: 20,
    price: 200,
    duration: 30,
    averageRating: 4.1,
    students: 2,
  },
  {
    _id: "7",
    title: "Photography Basics",
    description: "Learn the fundamentals of professional photography.",
    instructor: { name: "Sophia Martinez" },
    categorySlug: "photography",
    thumbnail: "https://faculty.spagreen.net/demo/public/images/20231111124240image_402x248-483.png",
    language: "English",
    level: "Beginner",
    discount: 25,
    price: 180,
    duration: 35,
    averageRating: 4.2,
    students: 3,
  },
  {
    _id: "8",
    title: "Business Management 101",
    description: "Essential business management principles for success.",
    instructor: { name: "Daniel Anderson" },
    categorySlug: "business-management",
    thumbnail: "https://faculty.spagreen.net/demo/public/images/20231111124240image_402x248-483.png",
    language: "English",
    level: "Intermediate",
    discount: 18,
    price: 320,
    duration: 55,
    averageRating: 4.4,
    students: 5,
  },
];
export default function AllCourse({ checkQuery }) {
  const [isGridCol, setIsGridCol] = useState(false);
  const [query, setQuery] = useState("");
  const [selectCategory, setSelectCategory] = useState("latest");

  // Sorting logic
  const sortedCourses = [...coursesData].sort((a, b) => {
    if (selectCategory === "top-rated") {
      return b.averageRating - a.averageRating; // Sort by rating (high to low)
    }
    return 0; // Default (no sorting applied)
  });

  // Filtering logic
  const filteredCourses = sortedCourses.filter((course) =>
    course.categorySlug.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="py-5">
      <div className="container mx-auto px-2 md:px-5">
        {/* Filter Bar */}
        <div className="filter-bar flex flex-col md:flex-row items-left my-3 min-h-[60px] justify-between rounded border border-slate-100 px-2 py-4 shadow-md">
          <div className="left-content order-2 mt-5 flex items-center gap-4 text-2xl md:order-1 md:mt-0">
            <Sheet>
              <SheetTrigger>
                <TableOfContents className="block lg:hidden" />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="z-50 block w-[300px] sm:w-[540px] lg:hidden"
              >
                <SheetHeader>
                  <SheetTitle>Filter Options Of Courses</SheetTitle>
                </SheetHeader>
                <FilterItem />
              </SheetContent>
            </Sheet>

            <button onClick={() => setIsGridCol(false)} className="hidden sm:block">
              <LayoutGrid />
            </button>
            <button onClick={() => setIsGridCol(true)} className="hidden sm:block">
              <LayoutList />
            </button>

            <p className="text-base text-gray-600">
              Showing {filteredCourses.length} of {coursesData.length} Results
            </p>
          </div>

          <div className="right-content flex items-center gap-1.5 md:gap-5">
            <div className="filter-course px-1.5 text-gray-500">
              <Select onValueChange={setSelectCategory} value={selectCategory}>
                <SelectTrigger className="w-[180px] rounded border border-gray-300">
                  <SelectValue placeholder="Filter Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="top-rated">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="search-bar flex items-center gap-1 rounded border px-2 py-1 border-gray-300">
              <input
                type="text"
                className="max-w-[150px] outline-none sm:w-fit"
                placeholder="Search by Category"
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search size="18" />
            </div>
          </div>
        </div>

        {/* Courses Content Section */}
        <div className="mt-6 grid grid-cols-12 gap-5 md:mt-8">
          <div className={`courses col-span-12 grid gap-5 lg:col-span-8 ${isGridCol ? "grid-cols-1" : "grid-cols-2"}`}>
            {filteredCourses.map((course) => (
              <div key={course._id} className={`col-span-2 min-h-[200px] rounded shadow-md sm:col-span-1 ${isGridCol ? "flex gap-5" : "flex-col"}`}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>

          <div className="courses-filter col-span-4 hidden rounded px-4 py-1.5 shadow-md lg:block">
            <FilterItem />
          </div>
        </div>
      </div>
    </section>
  );
}
