import {
  BookOpen,
  ChevronRight,
  Clock,
  DollarSign,
  Globe,
  MessageCircle,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import InfiniteScroll from "../shared/InfiniteScroll";

import ReviewCard from "./ReviewCard";

import AvgRating from "@/components/shared/AvgRating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSingleCourseReview } from "@/lib/actions/review.action";

export default async function CoursesTab({ course, page }) {
  const {
    level,
    discount,
    price,
    language,
    description,
    category,
    duration,
    averageRating,
    instructor,
  } = course;
  // console.log(course);
  const {
    reviews = [],
    hasNextPage = false,
    total = 0,
  } = await getSingleCourseReview({
    course: course?._id,
    page: Number(page) || 1,
    limit: 10,
  });
  // console.log(reviews);
  return (
    <>
      <Tabs defaultValue="about" className="mt-8 w-full">
        <TabsList className="bg-light-bg dark:bg-dark-hover w-full rounded px-1.5 py-5 shadow-sm">
          <TabsTrigger
            value="about"
            className="data-[state=active]:text-main dark:from-dark-bg dark:to-dark-hover rounded from-white to-white px-6 py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-gradient-to-b data-[state=active]:shadow-sm dark:data-[state=active]:bg-gradient-to-b dark:data-[state=active]:text-white"
          >
            About
          </TabsTrigger>
          <TabsTrigger
            value="course"
            className="data-[state=active]:text-main dark:from-dark-bg dark:to-dark-hover rounded from-white to-white px-6 py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-gradient-to-b data-[state=active]:shadow-sm dark:data-[state=active]:bg-gradient-to-b dark:data-[state=active]:text-white"
          >
            Reviews
          </TabsTrigger>
        </TabsList>
        {/* about ===================== */}
        <TabsContent value="about" className="mt-6">
          <div>
            <div className="dark:bg-dark-bg bg-light-bg rounded-lg border p-6 px-2.5 shadow-md">
              <h1 className="text-2xl font-bold">{category.name}</h1>
              <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
                {description}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 text-base text-gray-700 md:grid-cols-2 dark:text-gray-300">
                <p className="flex items-center gap-2">
                  <BookOpen size={18} className="text-main-500" />
                  <span className="font-medium">Level:</span> {level}
                </p>
                <p className="flex items-center gap-2">
                  <Globe size={18} className="text-purple-500" />
                  <span className="font-medium">Language:</span> {language}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={18} className="text-yellow-500" />
                  <span className="font-medium">Duration:</span> {duration}
                </p>
                <p className="flex items-center gap-2">
                  <DollarSign size={18} className="text-red-500" />
                  <span className="font-medium">Price:</span> {price}
                </p>
                <p className="flex items-center gap-2">
                  <Tag size={18} className="text-pink-500" />
                  <span className="font-medium">Discount:</span> {discount}
                </p>
              </div>
            </div>
            <Link href={`/instructors/${instructor?.slug}`}>
              <div className="group dark:bg-dark-bg bg-light-bg relative mt-4 rounded-xl border p-4 transition-shadow hover:shadow-lg">
                <div className="flex flex-col items-center gap-6 sm:flex-row">
                  <div className="flex-shrink-0">
                    <Image
                      src={instructor?.profilePicture}
                      alt={`${instructor?.firstName} ${instructor?.lastName}`}
                      width={80}
                      height={80}
                      className="rounded-full border-4 object-cover shadow-md"
                    />
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <h2 className="text-dark-bg dark:text-light-bg text-xl font-bold">
                      {instructor?.firstName} {instructor?.lastName}
                    </h2>
                    <p className="dark:text-medium-bg text-gray-600">
                      {instructor?.role === "instructor"
                        ? "Instructor"
                        : "Guest Writer"}
                    </p>
                    <p className="dark:text-medium-bg text-gray-600">
                      {instructor?.bio || instructor?.email}
                    </p>
                    <div className="mt-3 flex justify-center gap-3 sm:justify-start">
                      {/* Social links can be added here */}
                    </div>
                  </div>
                </div>
                {/* Arrow Icon with Animation */}
                <div className="absolute top-1/2 right-4 -translate-y-1/2 transform transition-transform duration-300 group-hover:translate-x-2">
                  <ChevronRight className="dark:text-medium-bg h-6 w-6 text-gray-600" />
                </div>
              </div>
            </Link>
          </div>
        </TabsContent>
        {/* course =================== */}
        <TabsContent value="course" className="mt-6">
          {/* Student Review Section with enhanced UI */}
          <div className="bg-light-bg dark:bg-dark-bg mb-5 rounded-md border px-4 py-2.5">
            <h1 className="text-dark-bg dark:text-light-bg flex items-center gap-2 text-lg font-bold md:text-2xl">
              Average Rating
            </h1>
            <AvgRating avgRating={averageRating} />
            <h2 className="text-lg">Total {reviews?.length} Ratings</h2>
          </div>
          {total > 0 && (
            <div>
              <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
                <h2 className="text-dark-bg dark:text-light-bg flex items-center gap-2 text-lg font-bold md:text-2xl">
                  <MessageCircle
                    size={24}
                    className="text-main dark:text-dark-btn"
                  />
                  Student Review ({total || 0})
                </h2>
                <p>
                  Show {reviews?.length} of {total} Result
                </p>
              </div>
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="dark:bg-dark-bg relative rounded-lg border bg-white p-5 shadow transition-shadow duration-200 hover:shadow-md"
                  >
                    <ReviewCard review={review} />
                  </div>
                ))}

                {/* InfiniteScroll */}
                <InfiniteScroll hasNextPage={hasNextPage} />
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
