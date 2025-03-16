"use client";
import CheckCategory from "@/components/shared/CheckCategory";
import { Mail, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FeaturedBlog from "./FeaturedBlog";
import { useState } from "react";

const BlogDetails = () => {
  //  const [query, setQuery] = useState("");
  const blogData = [
    {
      id: 1,
      name: "Blog 1",
      title: "How to Use Behavioral Data to Master Your Marketing Strategy",
      description:
        "While the virtual world brings plenty of challenges, it also provides new and continually evolving opportunities for innovative marketing tactics...",
      image: "/blog1.png",
      category: "Marketing",
      date: "14 March 2025",
      instructor: "Emma Williams",
      detailButton: "Read More",
    },
    {
      id: 2,
      name: "Blog 2",
      title: "The Future of Web Development: Trends to Watch in 2025",
      description:
        "Web development is constantly evolving, and 2025 is set to bring groundbreaking changes. From AI-powered design to low-code development platforms...",
      image: "/blog2.png",
      category: "Web Development",
      date: "14 March 2025",
      instructor: "Sophia Martinez",
      detailButton: "Read More",
    },
    {
      id: 6,
      name: "Blog 5",
      title: "The Future of Web Development: Trends to Watch in 2025",
      description:
        "Web development is constantly evolving, and 2025 is set to bring groundbreaking changes. From AI-powered design to low-code development platforms...",
      image: "/blog2.png",
      category: "Web Development",
      instructor: "Sophia Martinez",
      date: "14 March 2025",
      detailButton: "Read More",
    },
    {
      id: 3,
      name: "Blog 3",
      title: "Mastering JavaScript: Best Practices for Clean Code",
      description:
        "JavaScript is a powerful language, but writing clean and efficient code is a skill every developer must master...",
      image: "/blog3.png",
      category: "Programming",
      instructor: "Olivia Chen",
      date: "14 March 2025",
      detailButton: "Read More",
    },
    {
      id: 4,
      name: "Blog 4",
      title: "The Role of UI/UX in Modern Web Design",
      description:
        "User experience and interface design play a crucial role in modern web development...",
      image: "/blog4.png",
      category: "UI/UX Design",
      instructor: "Isabella Johnson",
      date: "14 March 2025",
      detailButton: "Read More",
    },
    {
      id: 5,
      name: "Blog 5",
      title: "SEO in 2025: How to Optimize for Search Engines",
      description:
        "SEO continues to evolve as search engines update their algorithms...",
      image: "/blog1.png",
      category: "SEO & Digital Marketing",
      date: "14 March 2025",
      instructor: "Ava Thompson",
      detailButton: "Read More",
    },
  ];



  // Filter courses by category
  // const filteredCourses = sortedCourses.filter((course) =>
  //   course.category.toLowerCase().includes(query.toLowerCase())
  // );
  return (
    <div className="container mx-auto px-4 py-6 lg:max-w-6xl">
      {/* Header */}
      <div className="mb-8 items-center text-center flex justify-between">
        <div>
        
          <h1 className="text-2xl lg:text-4xl font-semibold">All Posts</h1>
        </div>
        <div>
          <p className="text-green-600 ">
            Showing {blogData.length} results
          </p>
        </div>
        <div className="search-ba border-gray-4300 flex items-center gap-1 rounded border px-2 py-1">
          <input
            type="text"
            className="max-w-[150px] outline-none sm:w-fit"
            placeholder="Search by Category"
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="icon">
            <Search />
          </div>
        </div>
      </div>
      <hr className="mb-8 border-t-2 border-gray-500" />
      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Blog Posts Section */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {blogData.map((blog) => (
              <div
                key={blog.id}
                className="transform cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Image
                  src={blog.image}
                  alt={blog.name}
                  layout="responsive"
                  width={16}
                  height={9}
                  className="h-80 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">{blog.category}</p>
                    <p className="bg-green rounded-md p-2 text-sm">
                      {blog.date}
                    </p>
                  </div>

                  <h2 className="mt-2 text-lg font-semibold">{blog.title}</h2>
                  <p className="mt-2 text-gray-600">
                    {blog.description.slice(0, 100)}...
                  </p>
                </div>
                <div className="flex items-center justify-between px-4 pb-4">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Mail />
                    <p>1</p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <User />
                    <p>{blog.instructor}</p>
                  </div>
                  <Link
                    href={`/blog/${blog.id}`}
                    className="text-green font-semibold hover:underline"
                  >
                    {blog.detailButton}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar (Categories) */}
        <div className="rounded-lg p-6 md:col-span-1">
          <h2 className="mb-4 text-2xl font-semibold">All Categories</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <CheckCategory
                id="webDesign"
                label="Web Design"
                keyCategory="category"
              />
            </li>
            <li className="flex items-center gap-2">
              <CheckCategory
                id="webDevelopment"
                label="Web Development"
                keyCategory="category"
              />
            </li>
            <li className="flex items-center gap-2">
              <CheckCategory
                id="flutter"
                label="Flutter"
                keyCategory="category"
              />
            </li>
          </ul>
        </div>
      </div>
      <FeaturedBlog></FeaturedBlog>
    </div>
  );
};

export default BlogDetails;
