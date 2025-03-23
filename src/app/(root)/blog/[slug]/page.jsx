import { getBlogBySlug } from "@/lib/actions/blog.action";
<<<<<<< HEAD:src/app/(root)/blog/[id]/page.jsx
import Image from "next/image";
import Link from "next/link";

const BlogDetails = async ({ params }) => {
  const { slug } = await params; 

  const blog = await getBlogBySlug(slug);
=======
import { CalendarDays, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
>>>>>>> a7aae59d4818ba6632c589909e88036c61abdc8c:src/app/(root)/blog/[slug]/page.jsx

const CourseDetails = async ({ params }) => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

<<<<<<< HEAD:src/app/(root)/blog/[id]/page.jsx
  if (!blog) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-red-500">Blog not found!</p>
      </section>
    );
  }


  const { thumbnail, category, duration, averageRating, instructor } = blog;

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container dark:bg-black-light/50 px-4 md:px-8 mx-auto shadow-md rounded-lg p-6 md:p-10 max-w-3xl">
=======
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
>>>>>>> a7aae59d4818ba6632c589909e88036c61abdc8c:src/app/(root)/blog/[slug]/page.jsx
        <Image
          src={thumbnail}
          alt={category?.name || "Blog Image"}
          width={600}
          height={300}
          className="w-full h-60 object-cover rounded"
        />
        <h1 className="text-2xl font-bold mt-4">{category?.name}</h1>
        <p className="text-gray-700 mt-2">{category?.description}</p>
        <p className="text-sm text-gray-500 mt-1">
          Instructor: {instructor?.email || "N/A"}
        </p>
        <p className="text-sm text-gray-500">Duration: {duration || "N/A"}</p>
        <p className="text-sm text-gray-500">
          Rating: {averageRating ? averageRating.toFixed(1) : "N/A"} / 10
        </p>
<<<<<<< HEAD:src/app/(root)/blog/[id]/page.jsx
=======

>>>>>>> a7aae59d4818ba6632c589909e88036c61abdc8c:src/app/(root)/blog/[slug]/page.jsx
        <Link
          href="/blogs"
          className="mt-5 inline-block px-4 py-1.5 bg-green text-white rounded"
        >
          Go Back
        </Link>
      </div>
<<<<<<< HEAD:src/app/(root)/blog/[id]/page.jsx
    </section>
=======
      <div className=" md:col-span-2 col-span-7">
        <h1 className=" text-center text-2xl">You May Also Like</h1>
      </div>

    </div>
>>>>>>> a7aae59d4818ba6632c589909e88036c61abdc8c:src/app/(root)/blog/[slug]/page.jsx
  );
};

export default BlogDetails;
