"use client"; // Ensure this runs on the client-side

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import AvgRating from "./AvgRating";
import InstructorContactForm from "./InstructorContactForm";

export default function InstructorTab({ instructor }) {
  const { instructorId, courses, aboutMe, education, phone, address } =
    instructor || {};

  return (
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
        <TabsTrigger
          value="contact"
          className="data-[state=active]:text-main dark:from-dark-bg dark:to-dark-hover rounded from-white to-white px-6 py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-gradient-to-b data-[state=active]:shadow-sm dark:data-[state=active]:bg-gradient-to-b dark:data-[state=active]:text-white"
        >
          Contact
        </TabsTrigger>
      </TabsList>

      <TabsContent value="about" className="mt-6">
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <div className="dark:bg-dark-bg rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">About Me</h3>
            <p className="mt-4">
              {aboutMe || "No information available at this time."}
            </p>
          </div>

          <div className="dark:bg-dark-bg rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Education</h3>
            <p>{education || "No information available at this time."}</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="course" className="mt-6">
        {courses?.length !== 0 ? (
          <div className="dark:bg-dark-bg mx-auto max-w-lg rounded-lg bg-light-bg p-6 text-center shadow w-full dark:text-gray-300">
            <h3 className="text-main dark:text-main-dark mb-2 text-xl font-semibold">
              No Courses Available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No courses have been published yet. Please check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {courses?.map((course, inx) => (
              <Link
                href={`/courses/${course?.slug}`}
                key={inx}
                className="dark:bg-dark-bg rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <h3 className="text-main dark:text-main-dark mb-3 text-lg font-semibold">
                  {course?.title}
                </h3>
                <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
                  {course?.description} ...
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {course?.students?.length || 0} Students
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {course?.lessonCount || 0} Lesson
                    </span>
                  </div>
                  <AvgRating avgRating={course?.avgRating || 0} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="contact" className="mt-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <InstructorContactForm email={instructorId?.email} />
          </div>

          <div className="dark:bg-dark-bg flex-1 rounded-lg bg-white p-6 shadow-sm lg:max-w-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-main/10 text-main dark:bg-main-dark/10 dark:text-main-dark flex h-10 w-10 items-center justify-center rounded-full">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200">
                    {instructorId?.email}
                  </p>
                </div>
              </div>
              {phone && (
                <div className="flex items-start gap-4">
                  <div className="bg-main/10 text-main dark:bg-main-dark/10 dark:text-main-dark flex h-10 w-10 items-center justify-center rounded-full">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Phone
                    </h3>
                    <p className="text-gray-800 dark:text-gray-200">{phone}</p>
                  </div>
                </div>
              )}
              {address && (
                <div className="flex items-start gap-4">
                  <div className="bg-main/10 text-main dark:bg-main-dark/10 dark:text-main-dark flex h-10 w-10 items-center justify-center rounded-full">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Location
                    </h3>
                    <p className="text-gray-800 dark:text-gray-200">
                      {address}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Office Hours
                </h3>
                <p className="text-gray-800 dark:text-gray-200">
                  Monday - Friday: 9:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
