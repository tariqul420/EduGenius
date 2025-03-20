import { getCourseBySlug } from "@/lib/actions/course.action";
import Image from "next/image";
import Link from "next/link";

const CourseDetails = async ({ params }) => {

  const { slug } = await params;

  const course = await getCourseBySlug(slug)
  console.log(course)

  // const course = {
  //   id: 1,
  //   name: "This is Demo Details page",
  //   image: "/course-1.webp",
  //   description:
  //     "Learn full-stack web development with hands-on projects and expert guidance.",
  //   rating: 8.5,
  //   instructor: "John Doe",
  //   duration: "12 weeks",
  // };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container px-4 md:px-8 mx-auto bg-white shadow-md rounded-lg p-6 md:p-10 max-w-3xl">
        <Image
          src={course.image}
          alt={course.name}
          width={600}
          height={300}
          className="w-full h-60 object-cover rounded"
        />
        <h1 className="text-2xl font-bold mt-4">{course.name}</h1>
        <p className="text-gray-700 mt-2">{course.description}</p>
        <p className="text-sm text-gray-500 mt-1">Instructor: {course.instructor}</p>
        <p className="text-sm text-gray-500">Duration: {course.duration}</p>
        <p className="text-sm text-gray-500">Rating: {course.rating} / 10</p>
        <Link
          href='http://localhost:3000/courses'
          className="mt-5 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </Link>
      </div>
    </section>
  );
};

export default CourseDetails;
