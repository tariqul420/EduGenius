'use client'
import React, { useState } from "react";
import { RiLayout4Fill, RiLayoutGridFill } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";

const Courses = () => {
  const [isGridCol, setIsGridCol] = useState(false)
  console.log(isGridCol);
  return (
    <>
      <section className="py-5">
        <div className="container px-2 md:px-5 mx-auto">
          {/* Filter Courses =============== */}
          <div className="filter-bar flex justify-between items-center px-4 shadow-md border border-slate-100 rounded min-h-[60px] my-3">
            <div className="left-content text-2xl flex gap-4 items-center">
              <button onClick={()=>setIsGridCol(false)} className="cursor-pointer">
                <RiLayoutGridFill />
              </button>
              <button onClick={()=>setIsGridCol(true)} className="cursor-pointer">
                <RiLayout4Fill />
              </button>
              <p className="text-base text-gray-600">Showing 9 Of 9 Results</p>
            </div>
            <div className="right-content flex items-center gap-5">
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
            <div className={`courses gap-5 grid grid-cols-2 col-span-12 lg:col-span-8 ${isGridCol? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2' }`}>
              <div className="course-item col-span-1 min-h-[200px] bg-slate-300 rounded w-full"></div>
              <div className="course-item col-span-1 min-h-[200px] bg-slate-300 rounded w-full"></div>
            </div>
            <div className="courses-filter rounded bg-amber-200 p-1.5 hidden lg:block col-span-4">
                <p className="text-2xl text-center font-medium">Filter Options Of Courses</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
