import { getBlogBySlug } from "@/lib/actions/blog.action";
import { CalendarDays, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseDetails = async ({ params }) => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  const course = {
    id: 1,
    name: "This is Demo Details page",
    image: "/course-1.webp",
    description:
      "Learn full-stack web development with hands-on projects and expert guidance.",
    rating: 8.5,
    instructor: "John Doe",
    duration: "12 weeks",
  };

  return (
    <div className="grid grid-cols-7  container mx-auto px-4 py-6 lg:max-w-6xl my-10   ">

      <div className=" md:col-span-5 col-span-7  px-4 md:px-8 mx-auto  items-center rounded-lg p-6  max-w-3xl">
        <div className="flex space-x-4 mb-4">
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
        <h1 className=" text-center text-2xl">You May Also Like</h1>
      </div>

    </div>
  );
};

export default CourseDetails;
