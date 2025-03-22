import { getCourseBySlug } from "@/lib/actions/course.action";
import { RefreshCcw, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseDetails = async ({ params }) => {

  const { slug } = await params;

  const course = await getCourseBySlug(slug)
  const {level,discount,price,students,thumbnail,language,description,category,duration,averageRating} = course;
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <div className="container dark:bg-black-light/50 px-2.5 md:px-8 mx-auto shadow-md rounded-lg p-6 md:p-10 max-w-3xl">
        <Image
          src={thumbnail}
          alt={category?.name}
          width={600}
          height={300}
          className="w-full h-60 object-cover rounded"
        />
        <h1 className="text-2xl font-bold mt-4">{category.name}</h1>
        <p className="text-gray-700 text-lg mt-2">{description}</p>
        <div className="flex gap-2 sm:gap-5 text-gray-500 mt-2">
        <span><p className="flex items-center gap-1.5"><Star size={16} color="#ffd500" strokeWidth={1} fill="#ffd500" absoluteStrokeWidth /> {averageRating}</p></span>
        <span><p className="flex items-center gap-1.5"><Users size={16} strokeWidth={1} absoluteStrokeWidth />{students}</p></span>
        <span><p className="flex items-center gap-1.5"><RefreshCcw size={16} strokeWidth={1} absoluteStrokeWidth /> Last Updated Mar 26, 2025</p></span>
        </div>
        
        <p className="text-sm text-gray-500 mt-1">Instructor: {course?.instructor.email}</p>
        <p className="text-sm text-gray-500">Level: {level}</p>
        <p className="text-sm text-gray-500">Price: {price}</p>
        <p className="text-sm text-gray-500">Discount: {discount}</p>
        
        <p className="text-sm text-gray-500">Language: {language}</p>
        <p className="text-sm text-gray-500">Duration: {duration}</p>
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
