import { FileText, Star, Users } from "lucide-react";
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
  const { id, rating, category } = course;
  return (
    <>
      <div className="course-image relative dark:bg-black-light">
        <p className="bg-green w-fit text-white absolute px-3 py-1.5 text-sm">{category}</p>
        <Image
          src={course.image}
          alt={course.name}
          width="100"
          height="100"
          className="w-full h-48 max-w-[300px] mx-auto object-cover rounded-t"
        />
        <p className="bg-black rounded w-fit flex items-center gap-1.5 text-white absolute right-8 -bottom-2 px-3 py-1 text-sm"><Star fill="yellow" size={16} className="text-orange-400" /> {rating}</p>
      </div>
      <div className="course-content p-3">
        <h3 className="text-lg font-semibold">{course.name}</h3>
        {/* <p className="text-sm text-gray-500">Rating: {course.rating}</p> */}
        <div className="flex py-5 justify-between text-slate-600">
          <div className="price flex gap-1.5 items-center"><FileText size={16} /> 9 Lessions</div>
          <div className="enroll flex gap-1.5 items-center"><Users size={16} /> 2 Enrolled</div>
        </div>
        <div className="flex justify-between">
          <p className="text-green font-medium text-xl md:text-2xl">$23</p>
          <Link className="bg-green text-white text-sm py-1.5 px-5 rounded" href={`/courses/${id}`}>Details</Link>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
