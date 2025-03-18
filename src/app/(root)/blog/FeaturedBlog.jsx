import CheckCategory from "@/components/shared/CheckCategory";
import { Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from 'react';

const FeaturedBlog = () => {
   




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
      name: "Blog 6",
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

  return (
    <div className="container lg:max-w-6xl mx-auto my-12 bg-gray-100 rounded-md px-4 py-6">
      {/* Header */}
      <div className=" text-center  md:flex  items-center mb-8">
        <h1 className="text-3xl font-semibold">Featured Blog</h1>
      
      </div>
      <hr className="border-t-2 border-gray-500 mb-8" />
      {/* Main Content */}
      <div className="  grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Blog Posts Section */}
        <div className="md:col-span-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
            {blogData.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform cursor-pointer"
              >
                <Image
                  src={blog.image}
                  alt={blog.name}
                  layout="responsive"
                  width={16} 
                  height={9}
                  className="w-full h-80 object-cover"
                />
                <div className="p-4">
                  <div className=" flex justify-between">
                    <p className="text-sm text-gray-500">{blog.category}</p>
                    <p className="text-sm bg-green p-2 rounded-md">
                      {blog.date}
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold mt-2">{blog.title}</h2>
                  <p className="text-gray-600 mt-2">
                    {blog.description.slice(0, 100)}...
                  </p>
                </div>
                <div className="flex justify-between items-center px-4 pb-4">
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
                    className="text-green uppercase font-semibold hover:underline"
                  >
                    {blog.detailButton}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      
      </div>
     
    </div>
  );
};

export default FeaturedBlog;
