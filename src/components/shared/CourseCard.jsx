'use client';

import useProvider from "@/hooks/useProvider";
import { Gauge, Languages, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CourseCard = ({ course }) => {
  const { title, category, thumbnail, language, level, price, averageRating, slug, discount } = course || {};
  const { isGridCol } = useProvider();
  const pathname = usePathname();

  return (
    <>
      <div className={`course-image relative rounded-md shadow h-fit border flex ${isGridCol && pathname === '/courses' ? 'flex-col sm:flex-row gap-5 items-center' : 'flex-col'}`}>
        <div>
          {/* Category Badge */}
          <p className="bg-green absolute top-0 left-0 z-[1] w-fit rounded px-3 py-1.5 text-sm text-white">
            {category?.name || category?.slug}
          </p>
          {/* Course Thumbnail */}
          <div className="relative w-fit mx-auto rounded-t-lg">
            <Image
              src={thumbnail}
              alt={title}
              className="mx-auto object-cover rounded-t-md w-[400px] max-h-[200px]"
              blurDataURL={thumbnail}
              width={100}
              height={100}
            />
            {/* Rating Badge */}
            <p
              className="flex absolute -bottom-1.5 right-0 w-fit items-center gap-1.5 rounded bg-black px-3 py-1 text-sm text-white"
              aria-label={`Rating: 4.5 stars`}
            >
              <Star fill="yellow" size={16} className="text-orange-400" /> {averageRating}
            </p>
          </div>
        </div>
        {/* Course Content */}
        <div className="course-content p-3">
          <h3 className="text-lg font-semibold">{title}</h3>
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
            <div className="flex items-center gap-1.5 dark:text-gray-300">
              <p className="font-medium md:text-2xl">
                $ <span className="text-overline font-light text-lg text-red-500 line-through">{price}</span>
              </p>
              <p className="text-green text-xl font-medium md:text-2xl">
                {parseFloat(price) - parseFloat(discount)}
              </p>
            </div>
            <Link
              className="bg-green rounded px-5 py-1.5 text-sm text-white transition-colors hover:bg-green-600"
              href={`/courses/${slug}`}
              aria-label={`View details for ${title}`}
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;

