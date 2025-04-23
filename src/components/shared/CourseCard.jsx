"use client";

import { Gauge, Languages, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import useProvider from "@/hooks/useProvider";

const CourseCard = ({ course }) => {
  const {
    title,
    category,
    thumbnail,
    language,
    level,
    price,
    averageRating,
    slug,
    discount,
  } = course || {};
  const { isGridCol } = useProvider();
  const pathname = usePathname();

  return (
    <div
      className={`dark:bg-dark-bg bg-white relative flex h-[400px] rounded-md border shadow transition-all duration-300 hover:-translate-y-2 ${
        isGridCol && pathname === "/courses"
          ? "h-fit flex-col items-center gap-5 sm:flex-row sm:gap-6"
          : "flex-col gap-5"
      }`}
    >
      <div className={"w-full"}>
        {/* Category Badge */}
        <p className="bg-main absolute top-0 left-0 z-[1] w-fit rounded px-3 py-1.5 text-sm text-white">
          {category?.name || category?.slug}
        </p>
        {/* Course Thumbnail */}
        <div
          className={`relative overflow-hidden ${
            isGridCol
              ? "h-[200px] w-full rounded-l-lg"
              : "h-[200px] w-full rounded-t-lg"
          }`}
        >
          <Image
            src={thumbnail}
            alt={title}
            width={isGridCol ? 500 : 400}
            height={200}
            blurDataURL={thumbnail}
            className={`h-full w-full rounded-t-lg object-cover ${isGridCol ? "rounded-l-lg" : "rounded-t-lg"}`}
            placeholder="blur"
            loading="lazy"
            sizes={isGridCol ? "300px" : "100vw"}
          />

          {/* Rating Badge */}
          <p
            className="absolute right-0 -bottom-1.5 flex w-fit items-center gap-1.5 rounded bg-black px-3 py-1 text-sm text-white"
            aria-label={`Rating: ${averageRating} stars`}
          >
            <Star fill="yellow" size={16} className="text-orange-400" />{" "}
            {averageRating}
          </p>
        </div>
      </div>

      {/* Course Content */}
      <div
        className={`course-content flex w-full flex-col p-3 ${!isGridCol && "flex-grow"}`}
      >
        <h3 className="flex-grow text-lg font-semibold">{title}</h3>
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
              ${" "}
              <span className="text-overline text-dark-btn text-lg font-light line-through">
                {price}
              </span>
            </p>
            <p className="text-main text-xl font-medium md:text-2xl">
              {parseFloat(price) - parseFloat(discount)}
            </p>
          </div>
          <Link
            className="bg-main hover:bg-main-600 rounded px-5 py-1.5 text-sm text-white transition-colors"
            href={`/courses/${slug}`}
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
