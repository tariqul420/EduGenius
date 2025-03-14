import Image from "next/image";
import Link from "next/link";
import React from "react";

// {
//   id: 1,
//   name: "Course 1",
//   description: "Learn the fundamentals of web development.",
//   image: "/course-1.webp",
//   category: "Web Development",
//   instructor: "John Doe",
//   detailButton: "View Details",
//   postDate: "2025-03-14", 
//   rating: 9.2, 
// },

const CourseCard = ({ course }) => {
  const {id,category} = course;
  return (
    <>
      <div className="course-image">
        <p className="bg-green w-fit text-white absolute px-3 py-1.5 text-sm">{category}</p>
        <Image
          src={course.image}
          alt={course.name}
          width="100"
          height="100"
          className="w-full h-48 max-w-[300px] mx-auto object-cover rounded-t"
        />
      </div>
      <div className="course-content p-3">
        <h3 className="text-lg font-semibold">{course.name}</h3>
        {/* <p className="text-sm text-gray-500">Rating: {course.rating}</p> */}
        <div className="flex justify-between text-slate-600">
          <div className="price">9 Lessions</div>
          <div className="enroll">2 Enrolled</div>
        </div>
        <div className="flex justify-between mt-3">
            <p className="text-green font-medium text-xl md:text-2xl">$23</p>
            <Link className="bg-green text-white text-sm py-1.5 px-5 rounded" href={`/courses/${id}`}>Details</Link>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
