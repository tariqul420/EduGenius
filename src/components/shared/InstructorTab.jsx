import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MapPin, Phone } from "lucide-react";
import InstructorContactForm from "./InstructorContactForm";

export default function InstructorTab() {
  return (
    <Tabs defaultValue="about" className="mt-8 w-full">
      <TabsList className="w-full rounded bg-light-bg px-1.5 py-5 shadow-sm dark:bg-dark-hover">
        <TabsTrigger
          value="about"
          className="data-[state=active]:text-main  dark:from-dark-bg dark:to-dark-hover rounded px-6 py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-gradient-to-b from-white to-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gradient-to-b dark:data-[state=active]:text-white"
        >
          About
        </TabsTrigger>
        <TabsTrigger
          value="course"
          className="data-[state=active]:text-main  dark:from-dark-bg dark:to-dark-hover rounded px-6 py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-gradient-to-b from-white to-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gradient-to-b dark:data-[state=active]:text-white"
        >
          Courses
        </TabsTrigger>
        <TabsTrigger
          value="contact"
          className="data-[state=active]:text-main  dark:from-dark-bg dark:to-dark-hover rounded px-6 py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-gradient-to-b from-white to-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gradient-to-b dark:data-[state=active]:text-white"
        >
          Contact
        </TabsTrigger>
      </TabsList>

      <TabsContent value="about" className="mt-6">
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-dark-bg">
            <h3 className="mb-4 text-lg font-semibold">About Me</h3>
            <p className="mb-4">
              Hi, I&apos;m Denis – a passionate educator with over 7 years of experience in teaching web development and design.
            </p>
            <p className="mb-4">
              My goal is to help students build real-world skills through practical, hands-on courses. I focus on simplifying complex topics so that learning is enjoyable and effective.
            </p>
            <p>
              Outside of teaching, I work on freelance projects and mentor new developers entering the tech world.
            </p>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-dark-bg">
            <h3 className="mb-4 text-lg font-semibold">Education</h3>
            <p>MSc in Computer Science - Stanford University</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="course" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-dark-bg">
            <h3 className="mb-3 text-lg font-semibold text-main dark:text-main-dark">Full-Stack Web Development</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Learn to build dynamic web applications using modern technologies like React, Node.js, and MongoDB.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">12 Weeks</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">45 Lessons</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">Projects</span>
            </div>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-dark-bg">
            <h3 className="mb-3 text-lg font-semibold text-main dark:text-main-dark">UI/UX Design Principles</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Understand the fundamentals of user-centered design and how to create visually appealing interfaces.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">8 Weeks</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">30 Lessons</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">Case Studies</span>
            </div>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-dark-bg">
            <h3 className="mb-3 text-lg font-semibold text-main dark:text-main-dark">JavaScript Mastery</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Deep dive into JavaScript, covering everything from basics to advanced concepts.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">6 Weeks</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">25 Lessons</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">Exercises</span>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="contact" className="mt-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <InstructorContactForm />
          </div>
          
          <div className="flex-1 rounded-lg bg-white p-6 shadow-sm dark:bg-dark-bg lg:max-w-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-main/10 text-main dark:bg-main-dark/10 dark:text-main-dark">
                  <Phone size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
                  <p className="text-gray-800 dark:text-gray-200">01256325412</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-main/10 text-main dark:bg-main-dark/10 dark:text-main-dark">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                  <p className="text-gray-800 dark:text-gray-200">denis@10minschool.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-main/10 text-main dark:bg-main-dark/10 dark:text-main-dark">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h3>
                  <p className="text-gray-800 dark:text-gray-200">Mirpur, DOHS, Dhaka</p>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Office Hours</h3>
                <p className="text-gray-800 dark:text-gray-200">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-gray-800 dark:text-gray-200">Weekends: By appointment only</p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}