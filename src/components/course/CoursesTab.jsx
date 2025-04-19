import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  ChevronRight,
  Clock,
  DollarSign,
  Globe,
  RefreshCcw,
  Star,
  Tag,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CoursesTab({course}) {
   const {
     level,
     discount,
     price,
     students,
     thumbnail,
     language,
     description,
     category,
     duration,
     averageRating,
     instructor,
   } = course;
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
            Courses
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
              <div className="group dark:bg-dark-bg relative mt-4 rounded-xl border bg-white p-4 transition-shadow hover:shadow-lg">
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt aut
          deleniti laborum doloremque veritatis nesciunt, consectetur cumque
          animi? Sunt ad laboriosam quae! Sint repellendus ad sequi
          necessitatibus tenetur fuga architecto?
        </TabsContent>
      </Tabs>
    </>
  );
}
