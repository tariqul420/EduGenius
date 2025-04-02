import BestSellingCourse from "@/components/dashboard/instructor/BestSellingCourse";
import CourseStatistic from "@/components/dashboard/instructor/CourseStatistic";
import SellingReport from "@/components/dashboard/instructor/SellingReport";
import { BookOpen } from "lucide-react";

export default function Home() {
  const cardData = [
    {
      icon: BookOpen,
      num: 7,
      name: "New Courses",
    },
    {
      icon: BookOpen,
      num: 12,
      name: "Active Students",
    },
    {
      icon: BookOpen,
      num: 8,
      name: "Pending Reviews",
    },
    {
      icon: BookOpen,
      num: 15,
      name: "Total Lessons",
    },
  ];

  return (
    <section className="min-h-screen">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Overview
        </h1>
        <div className="grid grid-cols-1 gap-4 rounded-md border p-6 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {/* Cards */}
          {cardData?.map((card, index) => (
            <div
              key={index}
              className="dark:bg-dark-bg flex items-center gap-4 rounded-lg border bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                <card.icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  {card.num}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {card.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <CourseStatistic />

          <SellingReport />
        </div>

        <div className="mt-6">
          <BestSellingCourse />
        </div>
      </div>
    </section>
  );
}
