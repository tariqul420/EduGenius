'use client'
import React, { useState } from "react";
import { RiLayout4Fill, RiLayoutGridFill } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";

// Sample JSON data with image URLs and description
const coursesData = [
  { 
    id: 1, 
    name: "Course 1", 
    description: "Description of Course 1", 
    image: "/course-1.jpeg" 
  },
  { 
    id: 2, 
    name: "Course 2", 
    description: "Description of Course 2", 
    image: "/course-2.jpg" 
  },
  { 
    id: 3, 
    name: "Course 3", 
    description: "Description of Course 3", 
    image: "/course-3.jpg" 
  },
  { 
    id: 4, 
    name: "Course 4", 
    description: "Description of Course 4", 
    image: "/course-4.jpeg" 
  },
  { 
    id: 5, 
    name: "Course 5", 
    description: "Description of Course 5", 
    image: "/course-2.jpg" 
  },
  { 
    id: 6, 
    name: "Course 6", 
    description: "Description of Course 6", 
    image: "/course-3.jpg" 
  },
  { 
    id: 7, 
    name: "Course 7", 
    description: "Description of Course 7", 
    image: "/course-4.jpeg" 
  },
  { 
    id: 8, 
    name: "Course 8", 
    description: "Description of Course 8", 
    image: "/course-1.jpeg" 
  }
];

const Courses = () => {
  const [isGridCol, setIsGridCol] = useState(false);
  console.log(isGridCol);

  return (
    <>
      <section className="py-5">
        <div className="container px-2 md:px-5 mx-auto">
          {/* Filter Courses =============== */}
          <div className="filter-bar flex flex-col sm:flex-row py-4 justify-between items-center px-4 shadow-md border border-slate-100 rounded min-h-[60px] my-3">
            <div className="left-content text-2xl flex gap-4 items-center">
              <button onClick={() => setIsGridCol(false)} className="cursor-pointer hidden sm:block">
                <RiLayoutGridFill />
              </button>
              <button onClick={() => setIsGridCol(true)} className="cursor-pointer hidden sm:block">
                <RiLayout4Fill />
              </button>
              <p className="text-base text-gray-600">Showing 9 Of 9 Results</p>
            </div>
            <div className="right-content mt-3 sm:mt-0 flex items-center gap-5">
              <div className="filter-course text-gray-500 border border-gray-400 px-1.5">
                <select className="px-2 py-1 border-none outline-none" name="filter-course" id="filter-course">
                  <option className="border-none" value="latest">Latest</option>
                  <option className="border-none" value="top-rated">Top Rated</option>
                  <option className="border-none" value="oldest">Oldest</option>
                </select>
              </div>
              <div className="search-bar flex items-center gap-1 px-2 py-1 border border-gray-400">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="Search"
                />
                <div className="icon">
                  <IoSearchOutline />
                </div>
              </div>
            </div>
          </div>

          {/* Courses Content Section =============== */}
          <div className="courses-content mt-6 md:mt-8 grid gap-5 grid-cols-12">
            <div className={`courses gap-5 grid col-span-12 lg:col-span-8 ${isGridCol ? 'sm:grid-cols-1' : 'grid-cols-2'}`}>
              {/* Mapping through the JSON data to render course items */}
              {coursesData.map((course) => (
                <div key={course.id} className="course-item col-span-2 sm:col-span-1 min-h-[200px] shadow-md rounded">
                  <div className="course-image">
                    <Image src={course.image} alt={course.name} width='100' height='100' className="w-full h-48 object-cover rounded-t" />
                  </div>
                  <div className="course-content p-3">
                    <h3 className="text-lg font-semibold">{course.name}</h3>
                    <p className="text-sm">{course.description}</p>
                    <button 
                      className="mt-2 px-4 py-2 bg-green-800 cursor-pointer text-white rounded"
                      onClick={() => alert(`Redirecting to details page for ${course.name}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="courses-filter rounded bg-slate-200 p-1.5 hidden lg:block col-span-4">
              <p className="text-2xl text-center font-medium">Filter Options Of Courses</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
