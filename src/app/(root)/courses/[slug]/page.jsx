import { getCourseBySlug } from "@/lib/actions/course.action";
import Image from "next/image";
import Link from "next/link";

const CourseDetails = async ({ params }) => {

  const { slug } = await params;

  const course = await getCourseBySlug(slug)
  const {thumbnail,category,duration,averageRating} = course;
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container px-4 md:px-8 mx-auto  shadow-md rounded-lg p-6 md:p-10 max-w-3xl">
        <Image
          src={thumbnail}
          alt={category?.name}
          width={600}
          height={300}
          className="w-full h-60 object-cover rounded"
        />
        <h1 className="text-2xl font-bold mt-4">{category?.name}</h1>
        <p className="text-gray-700 mt-2">{category?.description}</p>
        <p className="text-sm text-gray-500 mt-1">Instructor: {course?.instructor.email}</p>
        <p className="text-sm text-gray-500">Duration: {duration}</p>
        <p className="text-sm text-gray-500">Rating: {averageRating} / 10</p>
        <Link
          href='http://localhost:3000/courses'
          className="mt-5 inline-block px-4 py-1.5 bg-green text-white rounded"
        >
          Go Back
        </Link>
      </div>
    </section>
  );
};

export default CourseDetails;
