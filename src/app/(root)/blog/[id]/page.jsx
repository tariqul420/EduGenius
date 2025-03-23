import { getBlogBySlug } from "@/lib/actions/blog.action";
import Image from "next/image";
import Link from "next/link";

const BlogDetails = async ({ params }) => {
  const { slug } = await params; 

  const blog = await getBlogBySlug(slug);


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
        <Link
          href="/blogs"
          className="mt-5 inline-block px-4 py-1.5 bg-green text-white rounded"
        >
          Go Back
        </Link>
      </div>
    </section>
  );
};

export default BlogDetails;
