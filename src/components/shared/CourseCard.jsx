import { Gauge, Languages, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = ({ course }) => {

  const { _id, category, price, language, level, thumbnail, title } = course || {};

  return (
    <>
       <div className="course-image relative">
        {/* Category Badge */}
        <p className="bg-green absolute top-0 left-0 w-fit px-3 py-1.5 text-sm text-white rounded z-[1]">
          {category}
        </p>

        {/* Course Thumbnail */}
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <Image
            src={thumbnail}
            alt={title}
            className="w-[300px] mx-auto"
            placeholder="blur"
            blurDataURL={thumbnail}
            width={100}
            height={100}
          />
        </div>

        {/* Rating Badge */}
        <p
          className="absolute right-2 -bottom-2 flex w-fit items-center gap-1.5 rounded bg-black px-3 py-1 text-sm text-white"
          aria-label={`Rating: 4.5 stars`}
        >
          <Star fill="yellow" size={16} className="text-orange-400" /> 4.5
        </p>
      </div>

      {/* Course Content */}
      <div className="course-content p-3">
        <h3 className="text-lg font-semibold">{title}</h3>

        {/* Language and Level */}
        <div className="flex justify-between py-5 text-slate-600">
          <div className="price flex items-center gap-1.5 dark:text-gray-300">
            <Languages size={16} /> {language}
          </div>
          <div className="enroll flex items-center gap-1.5 dark:text-gray-300">
            <Gauge size={16} /> {level}
          </div>
        </div>

        {/* Price and Details Button */}
        <div className="flex justify-between">
          <p className="text-green text-xl font-medium md:text-2xl">$ {price}</p>
          <Link
            className="bg-green rounded px-5 py-1.5 text-sm text-white hover:bg-green-600 transition-colors"
            href={`/courses/${_id}`}
            aria-label={`View details for ${title}`}
          >
            Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default CourseCard;