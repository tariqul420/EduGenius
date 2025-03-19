import { Gauge, Languages, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = ({ course, isLoading }) => {
  if (isLoading) {
    return (
      <div className="course-card rounded-lg border shadow-sm hover:shadow-md transition-shadow animate-pulse">
        <div className="course-image relative">
          <div className="relative h-48 bg-gray-200"></div>
        </div>
        <div className="course-content p-3">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex justify-between py-5">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  const { id, category, price, language, level, thumbnail, title } = course || {};

  return (
    <div className="course-card rounded-lg border shadow-sm hover:shadow-md transition-shadow">
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
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={thumbnail}
            sizes="(max-width: 768px) 100vw, 50vw"
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
            href={`/courses/${id}`}
            aria-label={`View details for ${title}`}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;