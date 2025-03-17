import CheckCategory from "@/components/shared/CheckCategory";
import { Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const DetailsLike = () => {

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
  ,
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
   
  ];

  return (
    <div className="container mx-auto my-12 rounded-md px-4 py-6 lg:max-w-6xl">
      {/* Header */}
      
      <hr className="mb-8 border-t-2 border-gray-500" />
      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6">
        {/* Blog Posts Section */}
        <div className="">
          <div className="grid grid-cols-1 gap-6">
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
                    className="text-green font-semibold uppercase hover:underline"
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





export default DetailsLike;