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

import CourseCard from "@/components/shared/CourseCard";
import { LayoutGrid, LayoutList, Search, TableOfContents } from "lucide-react";
import FilterItem from "./FilterItem";


// Sample JSON data with image URLs, description, and rating
const coursesData = [
  {
    id: 1,
    name: "Course 1",
    description: "Learn the fundamentals of web development.",
    image: "/course-1.webp",
    category: "Web Development",
    instructor: "John Doe",
    detailButton: "View Details",
    postDate: "2025-03-14",
    rating: 9.2,
  },
  {
    id: 2,
    name: "Course 2",
    description: "An introduction to data science techniques.",
    image: "/course-2.jpg",
    category: "Data Science",
    instructor: "Jane Smith",
    detailButton: "View Details",
    postDate: "2025-03-13",
    rating: 8.5,
  },
  {
    id: 3,
    name: "Course 3",
    description: "Master the art of graphic design.",
    image: "/course-3.jpg",
    category: "Graphic Design",
    instructor: "Emily Johnson",
    detailButton: "View Details",
    postDate: "2025-03-12",
    rating: 7.8,
  },
  {
    id: 4,
    name: "Course 4",
    description: "Learn essential cybersecurity skills.",
    image: "/course-4.jpeg",
    category: "Cybersecurity",
    instructor: "Michael Brown",
    detailButton: "View Details",
    postDate: "2025-03-11",
    rating: 9.5,
  },
  {
    id: 5,
    name: "Course 5",
    description: "Introduction to machine learning models.",
    image: "/course-2.jpg",
    category: "Machine Learning",
    instructor: "Sarah Lee",
    detailButton: "View Details",
    postDate: "2025-03-10",
    rating: 8.9,
  },
  {
    id: 6,
    name: "Course 6",
    description: "Boost your marketing skills online.",
    image: "/course-3.jpg",
    category: "Digital Marketing",
    instructor: "David Wilson",
    detailButton: "View Details",
    postDate: "2025-03-09",
    rating: 7.5,
  },
  {
    id: 7,
    name: "Course 7",
    description: "Learn the basics of professional photography.",
    image: "/course-4.jpeg",
    category: "Photography",
    instructor: "Sophia Martinez",
    detailButton: "View Details",
    postDate: "2025-03-08",
    rating: 8.3,
  },
  {
    id: 8,
    name: "Course 8",
    description: "Essential business management principles.",
    image: "/course-1.jpeg",
    category: "Business Management",
    instructor: "Daniel Anderson",
    detailButton: "View Details",
    postDate: "2025-03-07", // oldest
    rating: 7.0,
  },
];

const Courses = () => {
  const [isGridCol, setIsGridCol] = useState(false);
  const [query, setQuery] = useState("");
  const [selectCategory, setSelectCategory] = useState("latest"); // Default to 'latest'

  // Sort courses by selected criteria (rating or postDate)
  const sortedCourses = [...coursesData].sort((a, b) => {
    if (selectCategory === "oldest") {
      return new Date(a.postDate) - new Date(b.postDate); // ascending (oldest first)
    }
    if (selectCategory === "latest") {
      return new Date(b.postDate) - new Date(a.postDate); // descending (latest first)
    }
    if (selectCategory === "top-rated") {
      return b.rating - a.rating; // descending (top-rated first)
    }

    return new Date(b.postDate) - new Date(a.postDate); // default to latest
  });

  // Filter courses by category
  const filteredCourses = sortedCourses.filter((course) =>
    course.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <section className="py-5">
        <div className="container px-2 md:px-5 lg:max-w-6xl mx-auto">
          {/* Filter Courses =============== */}
          <div className="filter-bar flex flex-col md:flex-row py-4 justify-between items-left md:items-center px-2 md:px-4 shadow-md border border-slate-100 rounded min-h-[60px] my-3">
            <div className="left-content mt-5 md:mt-0 order-2 md:order-1 text-2xl flex gap-4 items-center">
              <Sheet width="200px">
                <SheetTrigger>
                  <TableOfContents className="block lg:hidden" />
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] z-50 sm:w-[540px] block lg:hidden"
                >
                  <SheetHeader>
                    <SheetTitle>Filter Options Of Courses</SheetTitle>
                  </SheetHeader>
                  <div className="courses-filter rounded shadow-md px-4 py-1.5 block lg:hidden">
                    <FilterItem />
                  </div>

                </SheetContent>
              </Sheet>

              <button
                onClick={() => setIsGridCol(false)}
                className="cursor-pointer hidden sm:block"
              >
                <LayoutGrid />
              </button>
              <button
                onClick={() => setIsGridCol(true)}
                className="cursor-pointer hidden sm:block"
              >
                <LayoutList />
              </button>

              <p className="text-base text-gray-600">
                Showing {filteredCourses.length} Of {coursesData.length} Results
              </p>
            </div>
            <div className="right-content order-1 md:order-2 flex flex-col sm:flex-row sm:items-center gap-1.5 md:gap-5">
              <div className="filter-course text-gray-500">
                <Select onValueChange={(value) => setSelectCategory(value)} value={selectCategory}>
                  <SelectTrigger className="w-[130px] sm:w-[150px] border rounded border-gray-300">
                    <SelectValue placeholder="Filter Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="top-rated">Top Rated</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                  </SelectContent>
                </Select>

              </div>
              <div className="search-ba w-[250px] flex justify-between items-center gap-1 px-2 py-1 rounded border border-gray-4300">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="Search by Category"
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="icon">
                  <Search size='16' />
                </div>
              </div>
            </div>
          </div>

          {/* Courses Content Section =============== */}
          <div className="courses-content mt-6 md:mt-8 grid gap-5 grid-cols-12">
            <div
              className={`courses gap-5 grid col-span-12 lg:col-span-8 ${isGridCol ? "sm:grid-cols-1" : "grid-cols-2"
                }`}
            >
              {/* CourseCard ========================= */}
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className={`course-item col-span-2 sm:col-span-1 min-h-[200px] shadow-md dark:bg-black-light rounded ${isGridCol ? "flex items-center" : ""
                    }`}
                >
                  <CourseCard course={course}></CourseCard>
                </div>
              ))}
            </div>

            {/* Content Filter Section ======================= */}
            <div className="courses-filter rounded shadow-md px-4 py-1.5 hidden lg:block col-span-4">
              <p className="text-2xl text-center font-medium mb-10">
                Filter Options Of Courses
              </p>
              {/* Add filter options here */}
              <div className="courses-filter rounded shadow-md px-4 py-1.5 hidden lg:block">
                <FilterItem />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
