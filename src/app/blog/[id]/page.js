"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CalendarDays, User } from "lucide-react";
import LoadMore from "@/components/shared/LoadMore";
import Like from "../DetailsLike";
import BlogDetails from "../page";
import DetailsLike from "../DetailsLike";



const CourseDetails = () => {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    if (id) {
      const courses = [
        {
          id: 1,
          name: "Blog 1",
          title: "How to Use Behavioral Data to Master Your Marketing Strategy",
          description:
            "While the virtual world brings plenty of challenges, it also provides new and continually evolving opportunities for innovative marketing tactics. Behavioral data helps marketers understand customer preferences, track user interactions, and predict future trends. By leveraging data analytics, businesses can create highly personalized marketing campaigns, increase engagement, and drive better conversions. This blog explores key strategies for using behavioral data effectively in your marketing strategy.",
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
            "Web development is constantly evolving, and 2025 is set to bring groundbreaking changes. From AI-powered design to low-code development platforms, developers must stay updated with emerging trends. Progressive web apps (PWAs), serverless computing, and Web3 technologies will revolutionize how websites and applications are built. In this blog, we’ll explore the most exciting trends shaping the future of web development and how developers can prepare for these innovations.",
          image: "/blog2.png",
          category: "Web Development",
          date: "14 March 2025",
          instructor: "Sophia Martinez",
          detailButton: "Read More",
        },
        {
          id: 3,
          name: "Blog 3",
          title: "Mastering JavaScript: Best Practices for Clean Code",
          description:
            "JavaScript is a powerful language, but writing clean and efficient code is a skill every developer must master. Poorly written code can lead to bugs, reduced performance, and maintainability issues. This blog provides best practices such as following consistent coding styles, using ES6+ features effectively, avoiding unnecessary complexity, and optimizing performance. Whether you're a beginner or an experienced developer, these tips will help you write high-quality JavaScript code.",
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
            "User experience and interface design play a crucial role in modern web development. A well-designed UI/UX can enhance usability, improve user retention, and increase conversion rates. This blog explores essential UI/UX principles, including intuitive navigation, accessibility, responsive design, and psychological triggers that influence user behavior. Learn how to create visually appealing and functionally efficient websites that offer a seamless user experience.",
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
            "SEO continues to evolve as search engines update their algorithms. Staying ahead of the curve requires a deep understanding of technical SEO, on-page and off-page optimization, and content strategies. This blog discusses the latest SEO trends, such as AI-driven search ranking, voice search optimization, and core web vitals. Discover actionable techniques to improve your website's visibility and rank higher on search engine results pages (SERPs).",
          image: "/blog1.png",
          category: "SEO & Digital Marketing",
          date: "14 March 2025",
          instructor: "Ava Thompson",
          detailButton: "Read More",
        },
        {
          id: 6,
          name: "Blog 6",
          title: "Mastering JavaScript: Best Practices for Clean Code",
          description:
            "JavaScript is the backbone of modern web applications, making it essential for developers to write clean, maintainable, and scalable code. This blog covers the importance of modular code structures, using design patterns, avoiding common pitfalls, and leveraging modern JavaScript features like async/await and ES6+ syntax. Learn how to improve code efficiency and enhance your development workflow with best practices.",
          image: "/blog3.png",
          category: "Programming",
          instructor: "Olivia Chen",
          date: "14 March 2025",
          detailButton: "Read More",
        },
      ];

      const foundCourse = courses.find((c) => c.id === Number(id));
      setCourse(foundCourse || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold"><LoadMore></LoadMore></p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Blog not found!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7  container mx-auto px-4 py-6 lg:max-w-6xl my-10   ">
      
      <div className=" md:col-span-5 col-span-7  px-4 md:px-8 mx-auto  items-center rounded-lg p-6  max-w-3xl">
     <div  className="flex space-x-4 mb-4">
     <CalendarDays />
     <p className="text-sm flex text-gray-500">
           {course.date} |<User></User>  By admin
        </p> 
        <hr className="mb-8 border-t-2 border-gray-500" />
     </div>
        <Image
          src={course.image}
          alt={course.name}
          width={800}
          height={800}
          className="w-full h-auto object-cover rounded"
        />
        <h1 className="text-3xl font-bold mt-4">{course.title}</h1>
        <p className="text-gray-600 text-sm mt-1">{course.category}</p>
        <p className="text-gray-700 mt-2">{course.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          <strong>Instructor:</strong> {course.instructor}
        </p>
        
        <Link
          href="/blog"
          className="mt-5 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Back
        </Link>
      </div>
      <div className=" md:col-span-2 col-span-7">
     <h1>You May Also Like</h1>
     <DetailsLike></DetailsLike>
      </div>

    </div>
  );
};

export default CourseDetails;
