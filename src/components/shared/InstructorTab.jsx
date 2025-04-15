"use client"; // Ensure this runs on the client-side

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MapPin, Phone } from "lucide-react";
import InstructorContactForm from "./InstructorContactForm";

export default function InstructorTab({ instructor }) {
  const { instructorId, courses } = instructor || {};

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
            <p className="mt-4">{instructorId?.aboutMe}</p>
          </div>

          <div className="dark:bg-dark-bg rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Education</h3>
            <p>
              {instructorId?.education ||
                "MSc in Computer Science - Stanford University"}
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="course" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2">
          {courses?.map((course, inx) => (
            <div className="dark:bg-dark-bg rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-main dark:text-main-dark mb-3 text-lg font-semibold">
                {course?.title}
              </h3>
              <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
                {course?.description} ...
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  12 Weeks
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  45 Lessons
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  Projects
                </span>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="contact" className="mt-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <InstructorContactForm />
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
              {instructorId?.phone && (
                <div className="flex items-start gap-4">
                  <div className="bg-main/10 text-main dark:bg-main-dark/10 dark:text-main-dark flex h-10 w-10 items-center justify-center rounded-full">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Phone
                    </h3>
                    <p className="text-gray-800 dark:text-gray-200">
                      {instructorId?.phone}
                    </p>
                  </div>
                </div>
              )}
              {instructorId?.address && (
                <div className="flex items-start gap-4">
                  <div className="bg-main/10 text-main dark:bg-main-dark/10 dark:text-main-dark flex h-10 w-10 items-center justify-center rounded-full">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Location
                    </h3>
                    <p className="text-gray-800 dark:text-gray-200">
                      {instructorId?.address}
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
                <p className="text-gray-800 dark:text-gray-200">
                  Weekends: By appointment only
                </p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
