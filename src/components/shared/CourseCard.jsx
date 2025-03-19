import { FileText, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseCard = ({ course }) => {
  const { _id, categorySlug, instructor, postDate } = course;
  return (
    <>
      <div className="course-image relative">
        <p className="bg-green absolute w-fit px-3 py-1.5 text-sm text-white">
          {categorySlug}
        </p>
        <Image
          src={course?.thumbnail}
          alt={course?.title}
          width="100"
          height="100"
          className="mx-auto h-48 w-full max-w-[300px] rounded-t object-cover"
        />
        <p className="absolute right-8 -bottom-2 flex w-fit items-center gap-1.5 rounded bg-black px-3 py-1 text-sm text-white">
          <Star fill="yellow" size={16} className="text-orange-400" /> 4.5
        </p>
      </div>
      <div className="course-content p-3">
        <h3 className="text-lg font-semibold">{course?.title}</h3>
        <p className="text-sm text-gray-500">Instructor: {instructor?.name}</p>
        <p className="text-sm text-gray-500">
          Posted on: {new Date(postDate).toLocaleDateString()}
        </p>
        <div className="flex justify-between py-5 text-slate-600">
          <div className="price flex items-center gap-1.5 dark:text-gray-300">
            <FileText size={16} /> 9 Lessons
          </div>
          <div className="enroll flex items-center gap-1.5 dark:text-gray-300">
            <Users size={16} /> 2 Enrolled
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-green text-xl font-medium md:text-2xl">$23</p>
          <Link
            className="bg-green rounded px-5 py-1.5 text-sm text-white"
            href={`/courses/${_id}`}
          >
            Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
